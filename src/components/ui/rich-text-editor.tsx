import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from './button'
import { 
	Bold, 
	Italic, 
	List, 
	ListOrdered,
	Heading2
} from 'lucide-react'
import { useEffect } from 'react'

interface RichTextEditorProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value || '',
		editorProps: {
			attributes: {
				class: 'min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm max-w-none',
			},
		},
	})

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || '')
		}
	}, [value, editor])

	useEffect(() => {
		if (editor) {
			editor.on('update', () => {
				onChange(editor.getHTML())
			})
		}
	}, [editor, onChange])

	if (!editor) {
		return null
	}

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().toggleBold().run()}
					data-active={editor.isActive('bold')}
					className={editor.isActive('bold') ? 'bg-accent' : ''}
					type="button"
				>
					<Bold className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					data-active={editor.isActive('italic')}
					className={editor.isActive('italic') ? 'bg-accent' : ''}
					type="button"
				>
					<Italic className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					data-active={editor.isActive('heading', { level: 2 })}
					className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
					type="button"
				>
					<Heading2 className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					data-active={editor.isActive('bulletList')}
					className={editor.isActive('bulletList') ? 'bg-accent' : ''}
					type="button"
				>
					<List className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					data-active={editor.isActive('orderedList')}
					className={editor.isActive('orderedList') ? 'bg-accent' : ''}
					type="button"
				>
					<ListOrdered className="h-4 w-4" />
				</Button>
			</div>
			<EditorContent editor={editor} />
		</div>
	)
}