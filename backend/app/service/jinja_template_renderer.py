from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader("../templates"))


def get_confirm_email_template(*parameters):

    template = env.get_template("confirm_email.html")

    return template.render(*parameters)
