from flask import Blueprint, jsonify, request
from database.models import Event, Comment, Media
import bleach

router_blueprint = Blueprint('router', __name__)

# Define allowed tags and attributes for sanitization
ALLOWED_TAGS = []
ALLOWED_ATTRIBUTES = {}

# ------------------------------------------------------------------ EVENT ROUTES ------------------------------------------------------------------

@router_blueprint.route('/get_event/<string:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = Event.objects.get(id=event_id)
        return jsonify(event.to_json()), 200
    except Event.DoesNotExist:
        return jsonify({"message": f"Event with id {event_id} does not exist"}), 404
    except Exception as e:
        return jsonify({"message": f"Failed to get an event! {str(e)}"}), 500

@router_blueprint.route('/create_event', methods=['POST'])
def create_event():
    try:
        data = request.get_json()
        
        # Extract data from request JSON and sanitize
        title = bleach.clean(data.get('title'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
        content = bleach.clean(data.get('content'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
        like_count = data.get('like_count', 0)
        dislike_count = data.get('dislike_count', 0)
        comments_data = data.get('comments', [])
        media_data = data.get('media', [])
        
        comments = []
        for comment_data in comments_data:
            comment_content = bleach.clean(comment_data.get('content'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            comment_author = bleach.clean(comment_data.get('author'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            comment = Comment(content=comment_content, author=comment_author)
            comments.append(comment)
            
        media = []
        for media_item in media_data:
            media_url = bleach.clean(media_item.get('url'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            media_type = bleach.clean(media_item.get('type'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            media_obj = Media(url=media_url, type=media_type)
            media.append(media_obj)
            
        event = Event(
            title=title,
            content=content,
            like_count=like_count,
            dislike_count=dislike_count,
            comments=comments,
            media=media
        )
        event.save()
        
        return jsonify({"message": "Event created successfully", "event_id": str(event.id)}), 201
        
    except Exception as e:
        return jsonify({"message": f"Failed to create an event! {str(e)}"}), 500

@router_blueprint.route('/delete_event/<string:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        event = Event.objects.get(id=event_id)
        event.delete()
        return jsonify({"message": "Event deleted successfully!"}), 200
    except Event.DoesNotExist:
        return jsonify({"message": f"Event with id {event_id} does not exist"}), 404
    except Exception as e:
        return jsonify({"message": f"Failed to delete event! {str(e)}"}), 500

@router_blueprint.route('/update_event/<string:event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        event = Event.objects.get(id=event_id)
        data = request.get_json()
        
        # Extract data from request JSON and sanitize
        title = bleach.clean(data.get('title'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
        content = bleach.clean(data.get('content'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
        like_count = data.get('like_count', 0)
        dislike_count = data.get('dislike_count', 0)
        comments_data = data.get('comments', [])
        media_data = data.get('media', [])
        
        comments = []
        for comment_data in comments_data:
            comment_content = bleach.clean(comment_data.get('content'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            comment_author = bleach.clean(comment_data.get('author'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            comment = Comment(content=comment_content, author=comment_author)
            comments.append(comment)
            
        media = []
        for media_item in media_data:
            media_url = bleach.clean(media_item.get('url'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            media_type = bleach.clean(media_item.get('type'), tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES)
            media_obj = Media(url=media_url, type=media_type)
            media.append(media_obj)
            
        # Update event fields
        event.update(
            title=title,
            content=content,
            like_count=like_count,
            dislike_count=dislike_count,
            comments=comments,
            media=media
        )
        
        return jsonify({"message": "Event updated successfully", "event_id": str(event.id)}), 200
    except Event.DoesNotExist:
        return jsonify({"message": f"Event with id {event_id} does not exist"}), 404
    except Exception as e:
        return jsonify({"message", f"Failed to update event! {str(e)}"})
    
# ---------------------------------------------------------------- REACTION ROUTES -----------------------------------------------------------------
@router_blueprint.route('/like_event/<string:event_id>', methods=['PUT'])
def like_event(event_id):
    try:
        event = Event.objects.get(id=event_id)
        event.like_count += 1
        event.save()
        
        return jsonify({"message": "Liked successfully!"})
    except Event.DoesNotExist:
        return jsonify({"message": f"Event with id {event_id} does not exist"}), 404
    except Exception as e:
        return jsonify({"message", f"Failed to like event! {str(e)}"})
    
@router_blueprint.route('/remove_like/<string:event_id>', methods=['PUT'])
def remove_like(event_id):
    try:
        event = Event.objects.get(id=event_id)
        event.like_count -= 1
        event.save()
        
        return jsonify({"message": "Removed like successfully!"})
    except Event.DoesNotExist:
        return jsonify({"message": f"Event with id {event_id} does not exist"}), 404
    except Exception as e:
        return jsonify({"message", f"Failed to remove like from event! {str(e)}"})
    
@router_blueprint.route('/dislike_event/<string:event_id>', methods=['PUT'])
def dislike_event(event_id):
    try:
        event = Event.objects.get(id=event_id)
        event.dislike_count += 1
        event.save()
        
        return jsonify({"message": "Disliked successfully!"})
    except Event.DoesNotExist:
        return jsonify({"message": f"Event with id {event_id} does not exist"}), 404
    except Exception as e:
        return jsonify({"message", f"Failed to dislike event! {str(e)}"})
    
@router_blueprint.route('/remove_dislike/<string:event_id>', methods=['PUT'])
def remove_dislike(event_id):
    try:
        event = Event.objects.get(id=event_id)
        event.dislike_count -= 1
        event.save()
        
        return jsonify({"message": "Removed dislike successfully!"})
    except Event.DoesNotExist:
        return jsonify({"message": f"Event with id {event_id} does not exist"}), 404
    except Exception as e:
        return jsonify({"message", f"Failed to remove dislike from event! {str(e)}"})