---
title: "Django: Day 6"
date: 2025-01-07
description: "Comprehensive overview of Django settings and configuration including database setup, security settings, middleware, templates, and core project configuration options."
showToc: true
categories: ["Django"]
tags: ["Django", "Python", "Configuration", "Settings", "Backend", "Web Development"]
summary: "Learn essential Django project settings including BASE_DIR, SECRET_KEY, DEBUG, ALLOWED_HOSTS, database configuration, middleware setup, and other critical configuration options."
images: ["/images/django/django.jpg"]
---
# Django Setting in Brief
Setting files are the files that contain the configuration of django project.Whats in the setting file?

- BASE_DIR : The directory where the project is located.
- SECRET_KEY : A secret key used for cryptographic signing such as sessions,cookie,password reset tokens,cross-site request forgery protection,etc.
- DEBUG : A boolean that turns on/off the debug mode.
- ALLOWED_HOSTS : A list of strings representing the host/domain names that the django site can serve.
- INSTALLED_APPS : A list of application names that are enabled in the project.
- MIDDLEWARE : A list of middleware that is applied to the request/response cycle for each request.
- ROOT_URLCONF :The base URL from which all URL patterns are derived.
- TEMPLATES : A list of dictionaries containing the configuration of the template engine.
    - BACKEND : The engine to use for rendering templates.
    - DIRS : A list of directories where the template engine should look for template source files.Used To make global templates folder
    - context_processors : A list of context processors that are applied to each request.
> Note: Template are not used in DRF
-WSGI_APPLICATION : The full Python path of the WSGI application object that Django’s built-in servers (e.g. runserver) will use.
- DATABASES : A dictionary containing the database configuration.
- AUTH_PASSWORD_VALIDATORS : A list of validators that are used to check the strength of the password.
- TIME_ZONE : The time zone of the project.
- LANGUAGE_CODE : The language code for the project.'en-us' is the default language code.
- DEFAULT_AUTO_FIELD : The default primary key field for the project.

