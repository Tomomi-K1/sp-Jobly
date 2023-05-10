useful link

https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

how can we centralize localStorage items? below is the comment from assignment
    -Step Seven: Using localStorage and Protecting Routes. If the user refreshes their page or closes the browser window, they’ll lose their token. Find a way to add localStorage to your application so instead of keeping the token in simple state, it can be stored in localStorage. This way, when the page is loaded, it can first look for it there. Be thoughtful about your design: it’s not great design to have calls to reading and writing localStorage spread around your app. Try to centralize this concern somewhere.As a bonus, you can write a generalized useLocalStorage hook, rather than writing this tied specifically to keeping track of the token.