import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const contentPath = path.join(process.cwd(), 'data', 'content.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(contentPath, 'utf8')
    const content = JSON.parse(fileContents)
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const newContent = await request.json()
    await fs.writeFile(contentPath, JSON.stringify(newContent, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error writing content:', error)
    return NextResponse.json(
      { error: 'Failed to write content' },
      { status: 500 }
    )
  }
}
