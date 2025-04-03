"use client";
import { Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UseLeaderboard } from "@/hooks/use-leaderboard";
import { ChatBubbleAvatar } from "../ui/chat/chat-bubble";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ActualAvatar } from "../actual-chat/actual-avatar";

type LeaderboardProps = {
  isMobile: boolean;
};
export const Leaderboard = ({ isMobile }: LeaderboardProps) => {
  const { loading, chatLeaders, likeLeaders } = UseLeaderboard();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{isMobile ? <Trophy /> : "Leaderboards"}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit sm-max-w-md px-10">
        <DialogHeader>
          <DialogTitle>Leaderboards</DialogTitle>
          <DialogDescription>Check out the competition</DialogDescription>
        </DialogHeader>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div className="w-full flex justify-center">
            <Tabs defaultValue="chats">
              <TabsList className="flex justify-center">
                <TabsTrigger value="chats">Most Chats</TabsTrigger>
                <TabsTrigger value="likes">Most Likes</TabsTrigger>
              </TabsList>
              <TabsContent
                value="chats"
                className="pt-2">
                <div className="flex w-full flex-col items-center gap-4">
                  {chatLeaders.map((l, i) => (
                    <div
                      key={i}
                      className="flex gap-8 rounded-md border py-2 px-8 items-center justify-between ">
                      <div>{i + 1}</div>
                      <div className="flex items-center gap-2">
                        <ActualAvatar
                          avatar={l.avatar.name}
                          hat={l.avatar.hat}
                          fallback="US"
                        />
                        <div>{l.displayName}</div>
                      </div>

                      <div>{l.chatCount}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="likes">
                <div className="flex w-full flex-col items-center gap-2">
                  {likeLeaders.map((l, i) => (
                    <div
                      key={i}
                      className="flex gap-8 rounded-md border py-2 px-8 items-center justify-between ">
                      <div>{i + 1}</div>
                      <div className="flex items-center gap-2">
                        <ActualAvatar
                          avatar={l.avatar.name}
                          hat={l.avatar.hat}
                          fallback="US"
                        />
                        <div>{l.displayName}</div>
                      </div>

                      <div>{l.likeCount}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
