1.) Create a project “project 1” in react which has 3 buttons and each button has its individual
number counter, so button1 is linked to counter1, button2 to counter2 and button3 to counter3.
Whenever a button is clicked, it’s relevant counter connected should go up.

2.) Replicate the 3 button and counter on a different project- “project 2” with same functionality.
Now when counter1 in project 1 that you created goes up, it should reflect the change on project 2
and vice versa. You have to use socket connection for this and values on both projects should be
updated without page refresh.
Example - If you click on button1 of project 1 then counter1 on both project 1 and project 2 should
reflect the change in number via socket connection, no page refresh. If button2 on project 2 is
clicked then counter2 on both project 1 and project 2 should reflect the change in count.

3.) Write the code for 1st part “project 1” in such a way so it is scalable – meaning whenever a new
button is added apart from the existing 3 buttons, a new counter will be added automatically. Socket
connection is optional and not required for these extra buttons that will be added after the 3 initial
buttons.
Example – I add few new buttons in the code, just general html script and your code automatically
reads how many buttons were added and then should add a respective counter according to the
number of buttons added and again on the click of the button, it’s respective counter should go up.
