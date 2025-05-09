#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author: qww
@Version: 1.0
@Description: APP INITIALIZATION
"""
from fastapi import FastAPI
from app.api import api_v1, API_V1_PREFIX

app = FastAPI()
app.mount(API_V1_PREFIX, api_v1)
# import os
# from flask import Flask, current_app, send_file
# from .api import api_v1_bp
# from .middleware import set_middlewares, AuthenticationMiddleware, LogMiddleWare

# app = Flask(__name__, static_folder="../dist/assets", template_folder="../dist")
# app.register_blueprint(api_v1_bp)
# app.config.from_object("server.config.Config")
# app = set_middlewares(app, [AuthenticationMiddleware, LogMiddleWare])


# def send_dist_file(file_path: str = "index.html"):
#     """Send the file from the dist directory."""
#     dist_dir = current_app.config["DIST_DIR"]
#     entry = os.path.join(dist_dir, file_path)
#     return send_file(entry)


# @app.route("/")
# @app.route("/index.html")
# def index_client():
#     """Index route for the client application."""
#     return send_dist_file()


# @app.route("/favicon.PNG")
# def client_app():
#     """Client application routes."""
#     return send_dist_file("favicon.PNG")
