import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import styles from './Post.module.css'
import { FormEvent, useState } from 'react';
import { ChangeEvent } from 'react';

interface Author {
  avatar_url: string
  name: string
  role: string 
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostType {
  id: number
  author: Author
  content: Content[]
  publishedAt: Date
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    'Comentario'
  ])
  
  const [newComment, setNewComment] = useState('')
  
  const publishedDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  })
  
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBr,
    addSuffix: true
  })
  
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    
    setComments([...comments, newComment])
    
    setNewComment('')
  }
  
  
  function handleNewCommentChange(event:  ChangeEvent<HTMLTextAreaElement>) {
    setNewComment(event.target.value)
  }
  
  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleltedOne = comments.filter(comment => comment !== commentToDelete)
    
    setComments(commentsWithoutDeleltedOne)
  }
  const isNewCommentEmpty = (newComment === '')
  
  return (
    <article className={styles.post}>
      <header>
        
        <div className={styles.author}>
          <Avatar
            hasBorder
            src={post.author.avatar_url}
          />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        
        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
        
      </header>
      
      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          }
          
          if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>
      
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder="Deixe um comentário"
          value={newComment}
          onChange={handleNewCommentChange}
          required
        />

        <footer>
          <button
            type="submit"
            disabled={isNewCommentEmpty}
          >
              Publicar
          </button>
        </footer>
      </form>
      
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
              <Comment
                key={comment}
                content={comment}
                onDeleteComment={deleteComment}
              />
          )
        })}
      </div>
    </article>
  )
}