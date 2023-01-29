def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    list_phrase = [letter for letter in phrase]
    list_phrase[0] = list_phrase[0].upper()
    return ''.join(list_phrase)