"use client"

export function Glass({ children, className = "", hover = false }) {
  return <div className={`glass ${hover ? "glass-hover" : ""} ${className}`}>{children}</div>;
}

// ─────────────────────────────────────────────
// ANIMATED TITLE
// ─────────────────────────────────────────────
function AnimatedTitle({ text, delay = 0 }) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block anim-fade-up"
          style={{ animationDelay: `${delay + i * .04}s`, whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────
// SKILL BAR
// ─────────────────────────────────────────────
function SkillBar({ name, level, index }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setFilled(true), index * 100);
    }, { threshold: .3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="font-mono text-xs" style={{ color: "rgba(200,190,240,.85)" }}>{name}</span>
        <span className="font-mono text-xs text-purple-400">{level}%</span>
      </div>
      <div className="h-1 rounded-sm" style={{ background: "rgba(139,92,246,.12)" }}>
        <div className="skill-fill" style={{ width: filled ? `${level}%` : "0%" }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────
function Nav({ page, setPage, available }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-4 transition-all duration-300 ${scrolled ? "nav-frosted" : ""}`}
      style={{ zIndex: 100 }}
    >
      <button
        onClick={() => setPage("home")}
        className="font-syne text-xl font-extrabold text-white flex items-center gap-2"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          className={`inline-block w-2 h-2 rounded-full ${available ? "anim-glow-pulse" : ""}`}
          style={{ background: available ? "#10b981" : "#6b7280" }}
        />
        AR
      </button>

      <div className="flex items-center gap-8">
        {["home","about","projects","contact"].map(l => (
          <button
            key={l}
            onClick={() => setPage(l)}
            className={`font-mono text-xs uppercase tracking-widest pb-px nav-link ${page === l ? "nav-link-active" : ""}`}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {l}
          </button>
        ))}
        <button
          onClick={() => setPage("admin")}
          className="btn-ghost font-mono text-xs uppercase tracking-wider rounded-lg px-4 py-1"
          style={{ cursor: "pointer" }}
        >
          Admin
        </button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// SECTION TITLE
// ─────────────────────────────────────────────
function SectionTitle({ label, title }) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(139,92,246,.5)" }}>{label}</span>
      <h2 className="font-syne font-extrabold text-white" style={{ fontSize: "clamp(32px,5vw,56px)", letterSpacing: "-0.02em" }}>
        {title}
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────
function HomePage({ data, setPage }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center relative px-10 pt-28 pb-20">

      {data.about.available && (
        <div className="inline-flex items-center gap-2 avail-badge rounded-full px-5 py-1 mb-10 anim-fade-up" style={{ animationDelay: ".1s" }}>
          <span className="inline-block w-2 h-2 rounded-full anim-glow-pulse" style={{ background: "#10b981" }} />
          <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">Available for Work</span>
        </div>
      )}

      <h1
        className="font-syne font-extrabold text-white mb-7"
        style={{ fontSize: "clamp(52px,9vw,110px)", lineHeight: .95, letterSpacing: "-0.02em" }}
      >
        <AnimatedTitle text={data.about.name} delay={.2} />
      </h1>

      <p
        className="font-mono uppercase tracking-widest text-purple-400 mb-8 anim-fade-up"
        style={{ fontSize: "clamp(14px,2vw,18px)", animationDelay: ".8s" }}
      >
        {data.about.role}
      </p>

      <p
        className="font-mono leading-loose max-w-xl mb-14 anim-fade-up"
        style={{ fontSize: 16, color: "rgba(200,190,240,.65)", animationDelay: "1s" }}
      >
        {data.about.bio}
      </p>

      <div className="flex flex-wrap gap-4 justify-center anim-fade-up" style={{ animationDelay: "1.2s" }}>
        <button onClick={() => setPage("projects")} className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-9 py-3" style={{ cursor: "pointer" }}>
          View Work
        </button>
        <button onClick={() => setPage("contact")} className="btn-outline font-mono text-xs uppercase tracking-widest rounded-xl px-9 py-3" style={{ cursor: "pointer" }}>
          Get in Touch
        </button>
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-up" style={{ animationDelay: "1.8s" }}>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(139,92,246,.4)" }}>Scroll</span>
        <div className="w-px h-12 anim-scroll-line" style={{ background: "linear-gradient(to bottom,rgba(139,92,246,.6),transparent)" }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
function AboutPage({ data }) {
  return (
    <div className="min-h-screen pt-36 pb-20 px-10 max-w-5xl mx-auto">
      <SectionTitle label="001" title="About Me" />
      <div className="grid grid-cols-2 gap-8 mt-12">

        <Glass hover className="p-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-7"
            style={{ background: "linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))" }}>
            👨‍💻
          </div>
          <h3 className="font-syne font-bold text-white text-2xl mb-3">{data.about.name}</h3>
          <p className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-5">{data.about.role}</p>
          <p className="font-mono text-sm leading-loose" style={{ color: "rgba(200,190,240,.7)" }}>{data.about.bio}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            {[["⚡ GitHub", data.about.socials?.github],["🔗 LinkedIn", data.about.socials?.linkedin],["🐦 Twitter", data.about.socials?.twitter]].map(([label, href]) => (
              <a key={label} href={href||"#"} className="font-mono text-xs text-purple-400 social-link rounded-md px-3 py-1 no-underline">{label}</a>
            ))}
          </div>
        </Glass>

        <Glass hover className="p-10">
          <h4 className="font-syne font-bold text-white text-lg mb-7">Skills & Technologies</h4>
          {data.about.skills.map((s, i) => <SkillBar key={s.name} {...s} index={i} />)}
        </Glass>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────
const GRADIENTS = [
  "linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))",
  "linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.6))",
  "linear-gradient(135deg,rgba(245,158,11,.6),rgba(139,92,246,.6))",
];
const EMOJIS = ["🚀","✨","📊","🎯","⚡","🌊"];

function ProjectsPage({ data }) {
  return (
    <div className="min-h-screen pt-36 pb-20 px-10 max-w-5xl mx-auto">
      <SectionTitle label="002" title="Projects" />
      <div className="grid gap-6 mt-12" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))" }}>
        {data.projects.filter(p => p.visible).map((p, i) => (
          <Glass key={p.id} hover className="p-8 flex flex-col gap-4">
            <div className="h-40 rounded-xl flex items-center justify-center text-5xl overflow-hidden mb-2"
              style={{ background: GRADIENTS[i % GRADIENTS.length] }}>
              {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : EMOJIS[i % EMOJIS.length]}
            </div>
            <h3 className="font-syne font-bold text-white text-xl">{p.title}</h3>
            <p className="font-mono text-xs leading-loose" style={{ color: "rgba(200,190,240,.65)" }}>{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map(tag => <span key={tag} className="tag-badge">{tag}</span>)}
            </div>
            <div className="flex gap-3 mt-auto pt-2">
              {p.github && <a href={p.github} className="proj-ghost font-mono text-xs rounded-lg px-4 py-2 no-underline">⌥ GitHub</a>}
              {p.live   && <a href={p.live}   className="proj-filled font-mono text-xs rounded-lg px-4 py-2 no-underline">↗ Live</a>}
            </div>
          </Glass>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
function ContactPage({ onNewMessage }) {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);

  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    onNewMessage({ ...form, id: Date.now(), date: new Date().toISOString().slice(0,10) });
    setSent(true); setForm({ name:"", email:"", message:"" });
  };

  return (
    <div className="min-h-screen pt-36 pb-20 px-10 max-w-2xl mx-auto">
      <SectionTitle label="003" title="Get In Touch" />
      <Glass className="p-12 mt-12">
        {sent ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-5">✨</div>
            <h3 className="font-syne font-bold text-white text-2xl mb-3">Message Sent!</h3>
            <p className="font-mono text-sm" style={{ color: "rgba(200,190,240,.6)" }}>I'll get back to you soon.</p>
            <button onClick={() => setSent(false)} className="btn-ghost font-mono text-xs rounded-lg px-5 py-2 mt-6" style={{ cursor:"pointer" }}>Send Another</button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5">
            {[{key:"name",label:"Name",type:"text",ph:"Your name"},{key:"email",label:"Email",type:"email",ph:"your@email.com"}].map(({key,label,type,ph}) => (
              <div key={key}>
                <label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">{label}</label>
                <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph} className="field-input" />
              </div>
            ))}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">Message</label>
              <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me about your project…" rows={5} className="field-input resize-y" />
            </div>
            <button type="submit" className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-4 mt-1" style={{ cursor:"pointer", border:"none" }}>
              Send Message →
            </button>
          </form>
        )}
      </Glass>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN — LOGIN
// ─────────────────────────────────────────────
function AdminLogin({ onAuth, setPage }) {
  const [pw, setPw]   = useState("");
  const [err, setErr] = useState(false);
  const attempt = () => { pw === "admin123" ? (setErr(false), onAuth()) : setErr(true); };

  return (
    <div className="min-h-screen flex items-center justify-center px-10">
      <Glass className="p-12 w-full max-w-sm text-center">
        <div className="text-5xl mb-5">🔐</div>
        <h2 className="font-syne font-bold text-white text-2xl mb-2">Admin Access</h2>
        <p className="font-mono text-xs mb-8" style={{ color:"rgba(200,190,240,.5)" }}>Password: admin123</p>
        <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr(false);}} onKeyDown={e=>e.key==="Enter"&&attempt()} placeholder="Enter password…" className="field-input mb-4" />
        {err && <p className="font-mono text-xs text-red-400 mb-3">Incorrect password.</p>}
        <button onClick={attempt} className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-3 w-full mb-4" style={{ cursor:"pointer", border:"none" }}>Login →</button>
        <button onClick={()=>setPage("home")} className="font-mono text-xs" style={{ background:"none", border:"none", color:"rgba(139,92,246,.5)", cursor:"pointer" }}>← Back to Portfolio</button>
      </Glass>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN PANEL
// ─────────────────────────────────────────────
function AdminPanel({ data, setData, setPage }) {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab]       = useState("dashboard");
  if (!authed) return <AdminLogin onAuth={()=>setAuthed(true)} setPage={setPage} />;

  const tabs = [
    {key:"dashboard",label:"📊 Dashboard"},
    {key:"about",    label:"👤 About"},
    {key:"projects", label:"🚀 Projects"},
    {key:"messages", label:`💬 Messages${data.messages.length?` (${data.messages.length})`:""}`},
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-9">
        <div>
          <h2 className="font-syne font-extrabold text-white text-3xl">Admin Panel</h2>
          <p className="font-mono text-xs text-purple-400 mt-1 tracking-wider">Manage your portfolio content</p>
        </div>
        <div className="flex gap-3">
          <button onClick={()=>setPage("home")} className="btn-ghost font-mono text-xs rounded-lg px-4 py-2" style={{cursor:"pointer"}}>← Portfolio</button>
          <button onClick={()=>setAuthed(false)} className="btn-logout font-mono text-xs rounded-lg px-4 py-2" style={{cursor:"pointer"}}>Logout</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 p-1 rounded-xl mb-7 border" style={{ background:"rgba(10,8,25,.4)", borderColor:"rgba(139,92,246,.12)" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)}
            className={`font-mono text-xs px-5 py-2 rounded-lg transition-all duration-200 ${tab===t.key?"admin-tab-active":"admin-tab"}`}
            style={{ cursor:"pointer", border:"none" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab==="dashboard" && <AdminDashboard data={data} />}
      {tab==="about"     && <AdminAbout data={data} setData={setData} />}
      {tab==="projects"  && <AdminProjects data={data} setData={setData} />}
      {tab==="messages"  && <AdminMessages data={data} setData={setData} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN — DASHBOARD
// ─────────────────────────────────────────────
function AdminDashboard({ data }) {
  const stats = [
    {label:"Projects", value:data.projects.length,                        icon:"🚀"},
    {label:"Visible",  value:data.projects.filter(p=>p.visible).length,   icon:"👁️"},
    {label:"Messages", value:data.messages.length,                        icon:"💬"},
    {label:"Status",   value:data.about.available?"Open":"Closed",        icon:"⚡"},
  ];
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))" }}>
      {stats.map(s => (
        <Glass key={s.label} hover className="p-7">
          <div className="text-3xl mb-3">{s.icon}</div>
          <div className="font-syne font-extrabold text-white text-4xl">{s.value}</div>
          <div className="font-mono text-xs uppercase tracking-widest mt-1" style={{ color:"rgba(200,190,240,.5)" }}>{s.label}</div>
        </Glass>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN — ABOUT EDITOR
// ─────────────────────────────────────────────
function AdminAbout({ data, setData }) {
  const [form, setForm]         = useState({ ...data.about });
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved]       = useState(false);

  const save = () => { setData(d=>({...d,about:form})); setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <Glass className="p-9">
      <h3 className="font-syne font-bold text-white text-xl mb-7">Edit About</h3>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <AdminField label="Name" value={form.name} onChange={v=>setForm({...form,name:v})} />
        <AdminField label="Role" value={form.role} onChange={v=>setForm({...form,role:v})} />
      </div>
      <div className="mb-5">
        <label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">Bio</label>
        <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} rows={3} className="field-input resize-y" />
      </div>

      <div className="flex items-center gap-4 mb-7">
        <label className="font-mono text-xs uppercase tracking-widest text-purple-400">Available for Work</label>
        <div onClick={()=>setForm({...form,available:!form.available})}
          className={`w-11 h-6 rounded-full relative transition-all duration-300 border ${form.available?"toggle-on":"toggle-off"}`}
          style={{ cursor:"pointer", borderColor:"rgba(255,255,255,.1)" }}>
          <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300" style={{ left:form.available?"22px":"2px" }} />
        </div>
      </div>

      <div className="mb-7">
        <label className="block font-mono text-xs uppercase tracking-widest mb-3 text-purple-400">Skills</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {form.skills.map((s,i) => (
            <div key={i} className="tag-badge flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color:"rgba(200,190,240,.8)" }}>{s.name}</span>
              <input type="number" min={0} max={100} value={s.level}
                onChange={e=>{ const sk=[...form.skills]; sk[i]={...sk[i],level:+e.target.value}; setForm({...form,skills:sk}); }}
                className="w-10 font-mono text-xs text-purple-400 outline-none" style={{ background:"transparent", border:"none" }} />
              <button onClick={()=>setForm({...form,skills:form.skills.filter((_,j)=>j!==i)})}
                className="text-red-400 font-mono" style={{ background:"none", border:"none", fontSize:14, cursor:"pointer" }}>×</button>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <input value={skillInput} onChange={e=>setSkillInput(e.target.value)} placeholder="Add skill…" className="field-input flex-1" />
          <button onClick={()=>{ if(skillInput.trim()){setForm({...form,skills:[...form.skills,{name:skillInput.trim(),level:70}]});setSkillInput("");} }}
            className="btn-ghost font-mono text-xs rounded-lg px-4 py-2" style={{ cursor:"pointer" }}>+ Add</button>
        </div>
      </div>
      <button onClick={save} className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-8 py-3" style={{ cursor:"pointer", border:"none" }}>
        {saved ? "Saved ✓" : "Save Changes"}
      </button>
    </Glass>
  );
}

// ─────────────────────────────────────────────
// ADMIN — PROJECTS EDITOR
// ─────────────────────────────────────────────
function AdminProjects({ data, setData }) {
  const blank = { id:Date.now(), title:"", description:"", image:null, tags:[], github:"", live:"", visible:true };
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(blank);
  const [tagInput, setTagInput] = useState("");

  const openEdit = p => { setForm({...p}); setEditing(p.id); setShowForm(true); };
  const openNew  = ()  => { setForm({...blank,id:Date.now()}); setEditing(null); setShowForm(true); };
  const save  = () => { editing ? setData(d=>({...d,projects:d.projects.map(p=>p.id===editing?form:p)})) : setData(d=>({...d,projects:[...d.projects,form]})); setShowForm(false); };
  const del   = id => setData(d=>({...d,projects:d.projects.filter(p=>p.id!==id)}));
  const toggle= id => setData(d=>({...d,projects:d.projects.map(p=>p.id===id?{...p,visible:!p.visible}:p)}));

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button onClick={openNew} className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-5 py-2" style={{ cursor:"pointer", border:"none" }}>+ New Project</button>
      </div>

      {showForm && (
        <Glass className="p-8 mb-6">
          <h3 className="font-syne font-bold text-white text-lg mb-6">{editing?"Edit Project":"New Project"}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <AdminField label="Title"      value={form.title}       onChange={v=>setForm({...form,title:v})} />
            <AdminField label="Image URL"  value={form.image||""}   onChange={v=>setForm({...form,image:v||null})} />
            <AdminField label="GitHub URL" value={form.github}      onChange={v=>setForm({...form,github:v})} />
            <AdminField label="Live URL"   value={form.live}        onChange={v=>setForm({...form,live:v})} />
          </div>
          <div className="mb-4">
            <label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">Description</label>
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} className="field-input resize-y" />
          </div>
          <div className="mb-6">
            <label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.tags.map((tag,i)=>(
                <span key={i} className="tag-badge flex items-center gap-2">
                  {tag}
                  <button onClick={()=>setForm({...form,tags:form.tags.filter((_,j)=>j!==i)})} style={{background:"none",border:"none",color:"rgba(239,68,68,.7)",cursor:"pointer"}}>×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <input value={tagInput} onChange={e=>setTagInput(e.target.value)} placeholder="Add tag…" className="field-input flex-1" />
              <button onClick={()=>{if(tagInput.trim()){setForm({...form,tags:[...form.tags,tagInput.trim()]});setTagInput("");}}} className="btn-ghost font-mono text-xs rounded-lg px-4 py-2" style={{cursor:"pointer"}}>+ Add</button>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="btn-primary font-mono text-xs text-white rounded-lg px-6 py-2" style={{cursor:"pointer",border:"none"}}>Save ✓</button>
            <button onClick={()=>setShowForm(false)} className="btn-muted font-mono text-xs rounded-lg px-6 py-2" style={{cursor:"pointer",border:"none"}}>Cancel</button>
          </div>
        </Glass>
      )}

      <div className="flex flex-col gap-3">
        {data.projects.map(p => (
          <Glass key={p.id} className="px-6 py-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="font-syne font-semibold text-base" style={{ color:p.visible?"#fff":"rgba(200,190,240,.4)" }}>{p.title}</div>
              <div className="font-mono text-xs mt-1" style={{ color:"rgba(200,190,240,.4)" }}>{p.tags.join(", ")}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>toggle(p.id)} className={`font-mono text-xs rounded-lg px-4 py-1 ${p.visible?"btn-success":"btn-muted"}`} style={{cursor:"pointer",minWidth:76}}>
                {p.visible?"Visible":"Hidden"}
              </button>
              <button onClick={()=>openEdit(p)} className="btn-ghost font-mono text-xs rounded-lg px-4 py-1" style={{cursor:"pointer"}}>Edit</button>
              <button onClick={()=>del(p.id)}   className="btn-danger font-mono text-xs rounded-lg px-4 py-1" style={{cursor:"pointer",border:"none"}}>Delete</button>
            </div>
          </Glass>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN — MESSAGES
// ─────────────────────────────────────────────
function AdminMessages({ data, setData }) {
  const del = id => setData(d=>({...d,messages:d.messages.filter(m=>m.id!==id)}));
  return (
    <div className="flex flex-col gap-4">
      {data.messages.length===0 ? (
        <Glass className="p-10 text-center">
          <p className="font-mono text-sm" style={{ color:"rgba(200,190,240,.4)" }}>No messages yet.</p>
        </Glass>
      ) : data.messages.map(m=>(
        <Glass key={m.id} className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="font-syne font-semibold text-white text-base">{m.name}</span>
              <span className="font-mono text-xs text-purple-400 ml-3">{m.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs" style={{ color:"rgba(200,190,240,.35)" }}>{m.date}</span>
              <button onClick={()=>del(m.id)} className="btn-danger font-mono text-xs rounded-lg px-3 py-1" style={{cursor:"pointer",border:"none"}}>Delete</button>
            </div>
          </div>
          <p className="font-mono text-xs leading-loose" style={{ color:"rgba(200,190,240,.65)" }}>{m.message}</p>
        </Glass>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN FIELD
// ─────────────────────────────────────────────
function AdminField({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} className="field-input" />
    </div>
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [data, setData] = useState(initialData);
  const onNewMessage = useCallback(msg => setData(d=>({...d,messages:[msg,...d.messages]})), []);
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  return (
    <>
      <style>{globalCSS}</style>
      <SpaceBackground />
      <Cursor />
      <Nav page={page} setPage={setPage} available={data.about.available} />
      <div className="relative" style={{ zIndex: 1 }}>
        {page==="home"     && <HomePage     data={data} setPage={setPage} />}
        {page==="about"    && <AboutPage    data={data} />}
        {page==="projects" && <ProjectsPage data={data} />}
        {page==="contact"  && <ContactPage  onNewMessage={onNewMessage} />}
        {page==="admin"    && <AdminPanel   data={data} setData={setData} setPage={setPage} />}
      </div>
    </>
  );
}
