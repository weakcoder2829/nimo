"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { INITIAL_CHATS, CAMPUS_STORIES, ChatThread } from "@/lib/mockData";
import {
  Send as PaperPlane,
  Heart,
  ArrowLeft,
  Search,
  CheckCheck,
  Smile,
  Edit,
  Phone,
  Video,
  Info,
} from "lucide-react";

export default function MessagesPage() {
  const [chats, setChats] = useState<ChatThread[]>(INITIAL_CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string>("c1");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSendHeart = () => {
    const newMsg = {
      id: "m_" + Date.now(),
      sender: "me" as const,
      text: "❤️",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              lastMessage: "❤️",
              time: "Just now",
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="h-[calc(100vh-65px)] md:h-[calc(100vh-40px)] max-w-5xl mx-auto p-2 sm:p-4">
        {/* Main Instagram Direct Split Window */}
        <div className="h-full rounded-3xl glass-card border border-border/80 shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* ================================================================= */}
          {/* LEFT COLUMN: Instagram Direct Thread List                         */}
          {/* ================================================================= */}
          <div
            className={`w-full md:w-80 lg:w-96 border-r border-border/60 flex flex-col shrink-0 ${
              selectedChatId ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Header: User Handle + New Message Button */}
            <div className="p-4 border-b border-border/60 flex items-center justify-between">
              <span className="font-heading font-black text-base text-foreground">
                mukul_cse
              </span>
              <button
                type="button"
                className="text-foreground hover:text-muted-foreground p-1"
                title="New message"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* Stories / Active Radar Bubbles */}
            <div className="p-3 border-b border-border/40 overflow-x-auto flex items-center gap-3 scrollbar-none">
              {CAMPUS_STORIES.slice(0, 5).map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
                  <div className="ig-story-ring p-0.5">
                    <div className="ig-story-avatar-inner">
                      <div className="clay-avatar w-11 h-11 text-lg">
                        {s.avatar}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-heading font-medium text-foreground max-w-[55px] truncate">
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-border/40">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  placeholder="Search direct whispers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 h-8 rounded-lg bg-muted/50 border-none text-xs font-heading outline-none"
                />
              </div>
            </div>

            {/* Direct Threads Scroll List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/20">
              {filteredChats.map((chat) => {
                const isSelected = chat.id === selectedChatId;
                return (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-black/5 dark:bg-white/10"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="clay-avatar w-12 h-12 text-2xl">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-heading font-bold text-xs text-foreground truncate">
                          {chat.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-heading">
                          {chat.time}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>

                    {chat.unreadCount && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Instagram Direct Active Chat Window                 */}
          {/* ================================================================= */}
          <div
            className={`flex-1 flex flex-col h-full ${
              !selectedChatId ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Direct Chat Top Bar */}
            <div className="p-3 sm:p-4 border-b border-border/60 glass-nav-header flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="md:hidden p-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedChatId("")}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <div className="clay-avatar w-10 h-10 text-xl">
                    {activeChat.avatar}
                  </div>
                  {activeChat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground">
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

              <div className="flex items-center gap-3 text-foreground">
                <Phone className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                <Video className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                <Info className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>

            {/* Direct Messages Stream */}
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
                      className={`max-w-[78%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-body ${
                        isMe
                          ? "bg-primary text-white rounded-br-xs shadow-xs"
                          : "bg-muted/70 text-foreground rounded-bl-xs border border-border/50"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 text-[9px] mt-1 font-heading ${
                          isMe ? "text-blue-100" : "text-muted-foreground"
                        }`}
                      >
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instagram Direct Message Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border/60 flex items-center gap-2.5">
              <button
                type="button"
                className="text-foreground hover:text-muted-foreground p-1"
              >
                <Smile className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder={`Message ${activeChat.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 h-10 px-4 rounded-full bg-muted/50 border border-border/70 text-xs font-body focus:outline-none focus:border-primary text-foreground"
              />

              {inputText.trim() ? (
                <button
                  type="submit"
                  className="font-heading font-black text-xs text-primary hover:text-primary/80 px-2"
                >
                  Send
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendHeart}
                  className="text-foreground hover:text-[#ed4956] transition-colors p-1"
                  title="Send heart"
                >
                  <Heart className="w-6 h-6 hover:fill-[#ed4956] hover:text-[#ed4956]" />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
