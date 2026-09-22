"""
Custom DRF exception handler. DRF's default handler only formats known
exception types (APIException, Http404, PermissionDenied); anything else
(a raw TypeError, KeyError, etc. from a misconfigured integration, for
example) falls through and Django's DEBUG=False default 500 response
exposes an unhelpfully raw error straight to the client. This wraps that
gap so any unhandled exception in an API view returns a clean, generic
JSON error instead - the real exception is still logged server-side for
debugging, just not shown to the end user.
"""
import logging
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        return response

    logger.exception("Unhandled exception in %s", context.get("view", "unknown view"))
    return Response(
        {"error": "This service is temporarily unavailable. Please try again later or contact support."},
        status=status.HTTP_503_SERVICE_UNAVAILABLE,
    )
