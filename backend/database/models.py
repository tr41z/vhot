from mongoengine import Document, EmbeddedDocument, ListField, EmbeddedDocumentField, StringField, IntField, DateTimeField, fields
from datetime import datetime
import uuid

class UUIDField(fields.StringField):
    """Custom UUID field for MongoEngine."""
    def __init__(self, *args, **kwargs):
        kwargs['default'] = lambda: str(uuid.uuid4())
        super(UUIDField, self).__init__(*args, **kwargs)

class Media(EmbeddedDocument):
    url = StringField(max_length=500, required=True)
    type = StringField(max_length=50, required=True) 

class Comment(EmbeddedDocument):
    content = StringField(max_length=300, required=True)
    author = StringField(max_length=100, required=True)
    created_at = DateTimeField(default=datetime.now)
    
    def to_json(self):
        return {
            'content': self.content,
            'author': self.author,
            'created_at': self.created_at
        }

class Event(Document):
    id = UUIDField(primary_key=True)
    title = StringField(max_length=300, required=True)
    content = StringField(max_length=1000, required=True)
    upvote_count = IntField(default=0)
    downvote_count = IntField(default=0)
    media = ListField(EmbeddedDocumentField(Media))
    comments = ListField(EmbeddedDocumentField(Comment))

    def to_json(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'content': self.content,
            'upvote_count': self.upvote_count,
            'downvote_count': self.downvote_count,
            'media': [{'url': media.url, 'type': media.type} for media in self.media],
            'comments': [comment.to_json() for comment in self.comments]
        }