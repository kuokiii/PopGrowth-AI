import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'population-data-'))
  const filePath = path.join(tempDir, file.name)
  
  const fileBuffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, fileBuffer)

  let scriptPath: string
  if (file.name.endsWith('.csv')) {
    scriptPath = path.join(process.cwd(), 'scripts', 'process_csv.py')
  } else if (file.name.endsWith('.xlsx')) {
    scriptPath = path.join(process.cwd(), 'scripts', 'process_excel.py')
  } else if (file.name.endsWith('.mat')) {
    scriptPath = path.join(process.cwd(), 'scripts', 'process_matlab.py')
  } else {
    await fs.rm(tempDir, { recursive: true, force: true })
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
  }

  try {
    const { stdout } = await execAsync(`python ${scriptPath} ${filePath}`)
    const result = JSON.parse(stdout)
    
    await fs.rm(tempDir, { recursive: true, force: true })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error processing file:', error)
    await fs.rm(tempDir, { recursive: true, force: true })
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 })
  }
}

