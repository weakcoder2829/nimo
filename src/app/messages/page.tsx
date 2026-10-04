"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { INITIAL_CHATS, ChatThread } from "@/lib/mockData";
import {
  Search,
  Send,
  ArrowLeft,
  ShieldCheck,
  CheckCheck,
  Smile,
} from "lucide-react";

export default function MessagesPage() {
  const [chats, setChats] = useState<ChatThread[]>(INITIAL_CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string>("c1");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");

  const activeChat = chats.find((c) => c.id === selectedChatId) || chats[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: "m_" + Date.now(),
      sender: "me" as const,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              lastMessage: newMsg.text,
              time: "Just now",
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );

    setInputText("");
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="h-[calc(100vh-65px)] md:h-[calc(100vh-40px)] max-w-6xl mx-auto p-2 sm:p-4">
        {/* Main 2-Column Glassmorphic Container */}
        <div className="h-full rounded-3xl glass-card border border-border/80 shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* LEFT COLUMN: Chat List */}
          <div
            className={`w-full md:w-80 lg:w-96 border-r border-border/60 flex flex-col shrink-0 ${
              selectedChatId ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Header & Search */}
            <div className="p-4 border-b border-border/60 space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="font-heading font-black text-xl text-foreground">
                  Campus Whispers
                </h1>
                <span className="clay-badge text-[10px] font-heading font-bold text-emerald-600 dark:text-emerald-400 gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  E2E Encrypted
                </span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  placeholder="Search chats or students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 h-9 rounded-xl bg-muted/40 border border-border/60 text-xs font-heading focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Chats Scroll List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/30">
              {filteredChats.map((chat) => {
                const isSelected = chat.id === selectedChatId;
                return (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary/10 border-l-4 border-l-primary"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="clay-avatar w-11 h-11 text-xl">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-card" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-heading font-bold text-sm text-foreground truncate">
                          {chat.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-heading shrink-0">
                          {chat.time}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>

                    {chat.unreadCount && (
                      <span className="clay-button-primary text-[10px] font-heading font-bold h-5 min-w-[20px] rounded-full px-1.5 shrink-0">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Chat Conversation Window */}
          <div
            className={`flex-1 flex flex-col h-full ${
              !selectedChatId ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Conversation Header */}
            <div className="p-3.5 sm:p-4 border-b border-border/60 glass-nav-header flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="md:hidden p-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedChatId("")}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <div className="clay-avatar w-10 h-10 text-xl">
                    {activeChat.avatar}
                  </div>
                  {activeChat.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground">
                    {activeChat.name}
                  </h3>
                  <div className="text-[11px] text-muted-foreground font-heading flex items-center gap-1.5">
                    <span>{activeChat.college}</span>
                    <span>&bull;</span>
                    <span className={activeChat.online ? "text-emerald-500 font-semibold" : ""}>
                      {activeChat.online ? "Active now" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat.messages.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <div className="clay-avatar w-7 h-7 text-xs shrink-0 mb-1">
                        {activeChat.avatar}
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] sm:max-w-md px-4 py-2.5 rounded-2xl text-sm font-body ${
                        isMe
                          ? "clay-button-primary text-white rounded-br-none"
                          : "clay-card text-foreground rounded-bl-none border border-border/60"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 text-[10px] mt-1 font-heading ${
                          isMe ? "text-blue-100" : "text-muted-foreground"
                        }`}
                      >
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border/60 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Whisper to ${activeChat.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 h-10 px-4 rounded-full bg-muted/50 border border-border/80 text-xs font-body focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="clay-button-primary w-10 h-10 rounded-full flex items-center justify-center p-0 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
