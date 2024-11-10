import { auth } from '@/libs/auth';
import { NextResponse } from 'next/server';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

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
        const { text } = await generateText({
          model: anthropic('claude-3-5-sonnet-20241022'),
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `You are an education content expert. Please generate contents based on the document I provide, include the following:

1. A suitable title within 10 words
2. A 3-sentence summary
3. as many as possible key points organized in Q&A format

The output should follow this JSON format in one line, do not break line: {"name": "/* title */", "summary": "/*summary*/", cards: [{"id": "/* a serial number */","question":"/* Q, should be very clear */", "answer": "/*A, no more than 20 words this part*/"}, {...}, ...]}`,
                },
                {
                  type: 'file',
                  data: fileBuffer,
                  mimeType: 'application/pdf',
                },
              ],
            },
          ],
        });
        console.log(text);
        return NextResponse.json(text);
      }
    }
    return NextResponse.json({ message: 'internal error' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
});