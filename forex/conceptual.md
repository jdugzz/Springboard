### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
  There are some major differences between Python and JavaScript. While they can be used to accomplish similar goals,
  Python seems more designed to work on the backend and interact with servers and databases, while JavaScript tends more
  toward front-end applications. There are a number of marked differences in their syntax as well. For instance,
  when defining variables in JS, certain keywords such as 'let' and 'const' are required, whereas in Python, there are 
  no keywords needed to create a new variable. Additionally, brackets are not needed to encapsulate functions. As a result,
  Python requires stricter formatting to define code. For example, a function in python requires the code that makes up the function
  to be indented under the function definition, whereas in JS, the indentation is irrelevant, so long as the code comprising the function
  is contained within matching brackets. 

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.
  One way to try to get a missing key without crashing the program is to use the 'get' method. If the key is not found,
  the 'get' method will return None. Additionally, you can use a try-except block of code. This would look as follows:
    try: 
      value = my_dict['c']
    except KeyError:
      print('Key not found.')
    else:
      print(value)

- What is a unit test?
  A unit test is a test designed to test the functionality of a specific function in a code. This generally does not include how that 
  function interacts with other functions, but simply tests the functionality and efficacy of a single component.

- What is an integration test?
  An integration test tests how specific modules or functions work together. This is more expansive than a unit test, and works to see how 
  different pieces of code 'integrate' and work together. 

- What is the role of web application framework, like Flask?
  A web application framework provides certain tools for building web applications. This provides a strucutred way to handle common web
  development tasks that would otherwise have to be crafted from scratch. For instance, it can handle routing, request handling, rendering templates,
  security, and database integration. 

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
  You would want to use a parameter in a route URL when you want to grab a dynamic part of a URL that is essential to the function of the route,
  such as when you want to grab a specific userId when displaying user profiles. You would want to use a URL query param when you want to add optional
  or additional information to a request. In sum, if a part of hte URL is essential to the functioning of the route, use a parameter, otherwise, you should
  use a query param. 

- How do you collect data from a URL placeholder parameter using Flask?
  To collect data from a URL placeholder parameter using Flask, you want to do the following:
  @app.route('/users/<name>)
  def show_user(name):

  The show_user view function will then take whatever is passed into the url between the less than/greater than signs as an argument
  and use it within the function. 

- How do you collect data from the query string using Flask?
  to collect data from the query sting, you want to use request.args.get. This will search the query string for the value 
  that corresponds to the key entered within the 'get' method. 

- How do you collect data from the body of the request using Flask?
  You would use request.form, as the information would be sent in the body of the request from a form using a POST method. 

- What is a cookie and what kinds of things are they commonly used for?
  A cookie is a small file that contains information stored on the user's website. They are used by websites for purposes such
  as session management, tracking, and personalization. 

- What is the session object in Flask?
  The session object is a way to persist user-specific data across multiple requests. It is stored on the server, and a 
  unique session-ID is used to associate subsequent requests from the same client with the same session data. 

- What does Flask's `jsonify()` do?
  Flask's jsonify() converts information into a JSON compatible format. 