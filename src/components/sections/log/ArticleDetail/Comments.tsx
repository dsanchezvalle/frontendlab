'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Comment = {
  initials: string
  author: string
  date: string
  text: string
}

type CommentsProps = {
  comments: Comment[]
  onSubmit?: (comment: string) => void
}

export default function Comments({ comments, onSubmit }: CommentsProps) {
  const [newComment, setNewComment] = useState("")

  const handlePost = () => {
    if (newComment.trim() && onSubmit) {
      onSubmit(newComment)
      setNewComment("")
    }
  }

  return (
    <div className="border-t pt-8">
      <h2 className="text-2xl font-bold mb-6 font-sans">Comments</h2>

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={index} className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                {comment.initials}
              </div>
              <div>
                <div className="font-medium font-sans">{comment.author}</div>
                <div className="text-xs text-muted-foreground font-sans">
                  {comment.date}
                </div>
              </div>
            </div>
            <p className="text-sm font-serif">{comment.text}</p>
          </div>
        ))}

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 font-sans">Add a comment</h3>
          <textarea
            className="w-full p-3 border rounded-md h-32 mb-4 font-serif"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handlePost} className="font-sans">Post Comment</Button>
        </div>
      </div>
    </div>
  )
}
