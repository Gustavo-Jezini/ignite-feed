import { Avatar } from './Avatar';
import { PencilLine } from "@phosphor-icons/react";
import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img 
        className={styles.cover}
        src='https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=40'
      />
      
      <div className={styles.profile}>
        <Avatar
          hasBorder
          src='https://avatars.githubusercontent.com/u/83838514?v=4'
        />
        
        <strong> Gustavo Jezini </strong>
        <span> Software Developer </span>
      </div>
      
      <footer>
        <a href='#'>
        <PencilLine size={20}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}