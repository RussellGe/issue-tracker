import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'
import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(request: NextRequest, {
    params
}: {
    params: {
        id: string;
    };
}) {
    const session = getServerSession(authOptions)

    if (!session)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) {
        return NextResponse.json({ message: 'Issue not found' }, { status: 404 });
    }
    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, {
    params
}: {
    params: {
        id: string;
    };
}) {
    const session = getServerSession(authOptions)

    if (!session)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) {
        return NextResponse.json({ message: 'Issue not found' }, { status: 404 });
    }
    await prisma.issue.delete({
        where: {
            id: parseInt(params.id)
        }
    })
    return NextResponse.json({ message: 'Issue deleted' });
}