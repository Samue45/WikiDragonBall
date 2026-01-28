import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, onEdit, onDelete, userId, isAdmin }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-primary mb-6">
        Comentarios ({comments.length})
      </h3>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isOwner={comment.user_id === userId}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
