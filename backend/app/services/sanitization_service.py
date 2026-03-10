import nh3

ALLOWED_TAGS = {
    "p", "br", "strong", "em", "u", "s", "del",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li",
    "pre", "code", "blockquote",
    "a", "img",
    "table", "thead", "tbody", "tr", "th", "td",
    "span", "sub", "sup", "div", "hr",
}

ALLOWED_ATTRIBUTES: dict[str, set[str]] = {
    "a": {"href", "target"},
    "img": {"src", "alt", "width", "height"},
    "span": {"style", "class"},
    "td": {"colspan", "rowspan"},
    "th": {"colspan", "rowspan"},
    "code": {"class"},
    "pre": {"class"},
    "div": {"class"},
}

ALLOWED_URL_SCHEMES = {"http", "https", "mailto"}


def sanitize_card_html(html: str | None) -> str | None:
    """Sanitize HTML content for card text fields.

    Allows only safe tags and attributes, stripping
    any potentially dangerous content (scripts, event handlers, etc.).
    """
    if not html:
        return html

    return nh3.clean(
        html,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        url_schemes=ALLOWED_URL_SCHEMES,
        strip_comments=True,
    )
