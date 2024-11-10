import { auth } from '@/libs/auth';
import { NextResponse } from 'next/server';

export const POST = auth(async function POST(req) {
  if (req.auth) return NextResponse.json(req.auth);
  if (process.env.NODE_ENV === 'development') {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData.getAll('file');
    if (uploadedFiles && uploadedFiles.length > 0) {
      const uploadedFile = uploadedFiles[0];
      console.log('Uploaded file:', uploadedFile);

      // Check if uploadedFile is of type File
      if (uploadedFile instanceof File) {
        // Convert ArrayBuffer to Buffer
        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
        console.log('File buffer:', fileBuffer);
      }
    }
    return NextResponse.json({ message: 'got you' });
  }
  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
});