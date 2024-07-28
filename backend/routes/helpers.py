import cloudinary.uploader
from werkzeug.utils import secure_filename

class Helpers: 
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in Helpers.ALLOWED_EXTENSIONS

    @staticmethod
    def upload_media(file):
        try:
            if not Helpers.allowed_file(file.filename):
                raise Exception("File type is not allowed.")
            
            filename = secure_filename(file.filename)
            upload_result = cloudinary.uploader.upload(file, public_id=filename)
            return {
                "url": upload_result['url'],
                "message": "Upload successful"
            }
        except Exception as e:
            raise Exception(f"Cloudinary upload failed! {str(e)}")
