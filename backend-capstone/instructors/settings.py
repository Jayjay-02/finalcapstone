INSTALLED_APPS = [
    ...
    "rest_framework",
    "rest_framework.authtoken",
    "instructors",
]

AUTH_USER_MODEL = "instructors.Instructor"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
}
