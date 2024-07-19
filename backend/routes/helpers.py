import cloudinary.uploader

class Helpers: 
    @staticmethod       
    def upload_media(file):
        try:
            # Upload to Cloudinary
            upload_result = cloudinary.uploader.upload(file)
            return {
                "url": upload_result['url'],
                "message": "Upload successful"
            }
        except Exception as e:
            raise Exception(f"Cloudinary upload failed! {str(e)}")