#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author: qww
# @Version: 1.0
# @License: MIT
# @Description: Method to add arguments to the parser

from flask_restx.reqparse import RequestParser


def add_args(parser: RequestParser, args: dict[str, list | dict[str, any]]):
    """Method to add arguments to the parser"""
    required = set(args.get("required", []))
    properties = args.get("properties", {})
    for arg in properties:
        item = properties[arg]
        parser.add_argument(
            arg,
            required=arg in required,
            location=item.get("location", "args"),
            type=item["type"],
            help=item.get("description", None),
            default=item.get("default", None),
            choices=item.get("enum", None),
        )
