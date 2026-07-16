"use client"

import { Button, Table } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { UserDeleteAlert } from './UserDeleteAlart';



// Explicitly restricted to 'admin' and 'client'
interface User {
    _id: string;
    name: string;
    email: string;
    image?: string;
    createdAt: string | Date;
    role: 'admin' | 'client';
}

interface AllUsersTableProps {
    allUsers: User[] | undefined;
}

const AllUsersTable: React.FC<AllUsersTableProps> = ({ allUsers }) => {
    const router = useRouter();

    const headers: string[] = [
        "Avatar",
        "Name", 
        "Email",
        "Joined Date",
        "Role",
        "Actions",
    ];

    return (
        <Table aria-label="All Users Table">
            <Table.ScrollContainer>
                <Table.Content className="min-w-[900px]">
                    
                    {/* TABLE HEAD */}
                    <Table.Header>
                        {headers.map((h) => (
                            <Table.Column isRowHeader key={h} className="text-center">
                                {h}
                            </Table.Column>
                        ))}
                    </Table.Header>

                    {/* TABLE BODY */}
                    <Table.Body emptyContent={"No users found"}>
                        {allUsers?.map((user) => {
                            const isAdmin = user.role === "admin";

                            return (
                                <Table.Row key={user._id} id={user._id}>

                                    {/* Avatar */}
                                    <Table.Cell>
                                        <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-zinc-700">
                                            <Image
                                                src={user.image || "/avatar-placeholder.png"}
                                                alt={user.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </Table.Cell>

                                    {/* Name */}
                                    <Table.Cell>
                                        <div className="font-medium text-zinc-200">
                                            {user.name}
                                        </div>
                                    </Table.Cell>

                                    {/* Email */}
                                    <Table.Cell>
                                        <span className="text-zinc-400">{user.email}</span>
                                    </Table.Cell>

                                    {/* Joined Date */}
                                    <Table.Cell>
                                        <span className="text-xs text-zinc-400">
                                            {new Date(user.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </Table.Cell>

                                    {/* Role Badge */}
                                    <Table.Cell>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs border capitalize font-medium ${
                                            isAdmin
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                                        }`}>
                                            {user.role}
                                        </span>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="flex items-center justify-end gap-2">
                                            {isAdmin ? (
                                                <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-md font-semibold tracking-wide">
                                                    Admin 👑
                                                </span>
                                            ) : (
                                                <div className="flex gap-1.5">
                                                    
                                                    <UserDeleteAlert userId={user._id}></UserDeleteAlert>
                                                </div>
                                            )}
                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            );
                        })}
                    </Table.Body>

                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default AllUsersTable;