import { NextResponse } from 'next/server';

// 模拟数据库数据
const mockChapterData: Record<
  string,
  {
    id: string;
    name: string;
    cards: {
      id: string;
      question: string;
      answer: string;
      highlights: string[];
    }[];
  }
> = {
  '1': {
    id: '1',
    name: '第一章：网络基础概念',
    cards: [
      {
        id: 'card1',
        question: '什么是计算机网络？',
        answer:
          '计算机网络是将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统、网络管理软件及网络通信协议的管理和协调下，实现资源共享和信息传递的计算机系统。',
        highlights: ['资源共享', '信息传递', '通信协议'],
      },
      {
        id: 'card2',
        question: '网络拓扑结构有哪些类型？',
        answer: '主要的网络拓扑结构包括：总线型、星型、环型、树型和网状型。每种结构都有其优缺点和适用场景。',
        highlights: ['总线型', '星型', '环型', '树型', '网状型'],
      },
    ],
  },
  '2': {
    id: '2',
    name: '第二章：TCP/IP协议',
    cards: [
      {
        id: 'card3',
        question: '什么是TCP/IP协议？',
        answer:
          'TCP/IP是一个网络通信模型，以及一整个网络传输协议家族，为互联网的基础通信架构。它定义了电子设备如何连入因特网，以及数据如何在它们之间传输的标准。',
        highlights: ['通信模型', '传输协议', '基础架构'],
      },
      {
        id: 'card4',
        question: 'TCP和UDP的区别是什么？',
        answer:
          'TCP是面向连接的协议，提供可靠的数据传输，具有错误检查和纠正机制；UDP是无连接协议，不保证数据传输的可靠性，但传输速度更快，适用于实时应用。',
        highlights: ['面向连接', '可靠传输', '无连接', '实时应用'],
      },
    ],
  },
};

export async function GET(request: Request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get('chID');

    // 验证参数
    if (!chapterId) {
      return NextResponse.json({ error: '缺少章节ID参数' }, { status: 400 });
    }

    // 获取章节数据
    const chapterData = mockChapterData[chapterId];

    // 检查章节是否存在
    if (!chapterData) {
      return NextResponse.json({ error: '章节不存在' }, { status: 404 });
    }

    // 返回章节数据
    return NextResponse.json({
      success: true,
      data: chapterData,
    });
  } catch (error) {
    console.error('Error in chapter API:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
