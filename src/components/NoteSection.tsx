import { Card } from "@/components/ui/card";
import { NoteControls } from "@/components/NoteControls";
import { VersionHistory } from "@/components/VersionHistory";
import { SampleSuggestions } from "@/components/SampleSuggestions";
import { useRole } from "../App";
import { MessageSquare, Lock, Bold, Italic, List } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toggle } from "./ui/toggle";

interface Version {
  content: string;
  timestamp: Date;
  source: "AI Refinement" | "Insurer Check" | "DSM Alignment" | "Manual Edit";
}

interface Comment {
  author: "client" | "therapist";
  content: string;
  timestamp: Date;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1 mb-2">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

interface NoteSectionProps {
  title: string;
  section: string;
  value: string;
  onChange: (value: string) => void;
  sampleNote: string;
  ageGroup: string;
  modality: string;
  isRefining: boolean;
  onRefine: () => void;
  versions: Version[];
  onRevert: (content: string) => void;
  latestChangeSource?: string;
}

export function NoteSection({
  title,
  section,
  value,
  onChange,
  sampleNote,
  ageGroup,
  modality,
  isRefining,
  onRefine,
  versions,
  onRevert,
  latestChangeSource,
}: NoteSectionProps) {
  const { role } = useRole();
  const [therapistNotes, setTherapistNotes] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[120px] focus:outline-none',
      },
    },
  });

  const therapistEditor = useEditor({
    extensions: [StarterKit],
    content: therapistNotes,
    onUpdate: ({ editor }) => {
      setTherapistNotes(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[120px] focus:outline-none',
      },
    },
  });
  const commentEditor = useEditor({
    extensions: [StarterKit],
    content: newComment,
    onUpdate: ({ editor }) => setNewComment(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none',
      },
    },
  });

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          author: role,
          content: newComment,
          timestamp: new Date(),
        },
      ]);
        setNewComment("");
        commentEditor?.commands.setContent("");
    }
  };

  const simplifiedTitle = role === "client" ? title.replace(/Notes$/, "Plan") : title;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{simplifiedTitle}</h3>
      <div className="space-y-4">
        <div className="bg-therapy-soft p-4 rounded-md">
          <p className="text-sm text-gray-600 italic mb-2">
            {role === "client" ? "What this means: " : "Sample: "}
            {sampleNote}
          </p>
          <SampleSuggestions section={section} ageGroup={ageGroup} modality={modality} />
        </div>

        <div className="border rounded-md p-3">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="min-h-[150px]" />
        </div>

        {role === "therapist" && (
          <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            Therapist-only Notes
          </div>
          <div className="border rounded-md p-3 bg-gray-50">
            <MenuBar editor={therapistEditor} />
            <EditorContent editor={therapistEditor} className="min-h-[100px]" />
          </div>
          </div>
        )}


        <div className="space-y-2">
          {role === "therapist" && (
            <NoteControls
              section={section}
              notes={value}
              isRefining={isRefining}
              onRefine={onRefine}
            />
          )}
          <VersionHistory
            versions={versions}
            onRevert={onRevert}
            latestChangeSource={latestChangeSource}
          />
        </div>

        <div className="border-t pt-4 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="mb-4"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {showComments ? "Hide Discussion" : "Show Discussion"}
          </Button>

          {showComments && (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    comment.author === "therapist"
                      ? "bg-therapy-secondary/20 ml-4"
                      : "bg-gray-100 mr-4"
                  }`}
                >
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span className="font-medium">
                      {comment.author === "therapist" ? "Therapist" : "Client"}
                    </span>
                    <span>
                      {new Date(comment.timestamp).toLocaleDateString()} at{" "}
                      {new Date(comment.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800">{comment.content}</p>
                </div>
              ))}

                <div className="flex gap-2">
                <EditorContent
                  editor={useEditor({
                  extensions: [StarterKit],
                  content: newComment,
                  onUpdate: ({ editor }) => setNewComment(editor.getHTML()),
                  editorProps: {
                    attributes: {
                    class: 'prose prose-sm max-w-none focus:outline-none flex-1',
                    },
                  },
                  })}
                  className="flex-1 border rounded-md p-2"
                />
                <Button onClick={handleAddComment}>Send</Button>
                </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}