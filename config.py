print("config")
#Fight Lights Pico

from machine import Pin
from init import random, rainbow
import button
import functions
import init

blank = (0,0,0)
red = (255,0,0)
orange = (255,127,0)
light_orange = (255,200,0)
yellow = (255,255,0)
lime = (160,255,0)
green = (0,255,0)
turqoise = (64,224,208)
blue = (0,0,255)
light_blue = (0,193,255)
violet = (170,0,255)
pink = (255,0,170)
cyan = (0,255,255)
white = (255,255,255)

colors = [red,orange,light_orange,yellow,lime,green,turqoise,blue,light_blue,violet,pink,cyan,white]

idle_mode1_colors = colors
idle_mode1_speed = 5
profile_name = "Profile 1"
led_count = 8
PIN_NUM = 0
leniency = 1
brightness_mod = 1
brightness_steps = 0.1
idle_mode = 1
idle_after = 30
save_stats = False
input_reset_time = 50
profile_color = (0,6,255)
clear_background_on_press = False
background = ((0.05,blue,1),(0.05,blue,2),(0.05,blue,3),(0.05,blue,4),(0.05,blue,5),(0.05,blue,6),(0.05,blue,7),(0.05,blue,8))
fadeout_speed = 6
fadein_speed = 20
up_MyButton = button.MyButton(1, 'up', functions.clear_led)
down_MyButton = button.MyButton(2, 'down', functions.clear_led)
right_MyButton = button.MyButton(3, 'right', functions.clear_led)
left_MyButton = button.MyButton(4, 'left', functions.clear_led)
select_MyButton = button.MyButton(5, 'select', functions.clear_led)
ps_MyButton = button.MyButton(6, 'ps', functions.clear_led)
start_MyButton = button.MyButton(7, 'start', functions.clear_led)
square_MyButton = button.MyButton(8, 'square', functions.clear_led)
triangle_MyButton = button.MyButton(9, 'triangle', functions.clear_led)
r1_MyButton = button.MyButton(10, 'r1', functions.clear_led)
l1_MyButton = button.MyButton(11, 'l1', functions.clear_led)
circle_MyButton = button.MyButton(12, 'circle', functions.clear_led)
x_MyButton = button.MyButton(13, 'x', functions.clear_led)
l2_MyButton = button.MyButton(14, 'l2', functions.clear_led)
r2_MyButton = button.MyButton(15, 'r2', functions.clear_led)

button_list = [up_MyButton,down_MyButton,right_MyButton,left_MyButton,select_MyButton,ps_MyButton,start_MyButton,square_MyButton,triangle_MyButton,r1_MyButton,l1_MyButton,circle_MyButton,x_MyButton,l2_MyButton,r2_MyButton]
init.button_list_length = len(button_list)


up_MyButton.set_config((0,), random, False)
down_MyButton.set_config((0,), random, False)
right_MyButton.set_config((0,), random, False)
left_MyButton.set_config((0,), random, False)
select_MyButton.set_config((1,2,3,4,5,6,7,8,), violet, False)
ps_MyButton.set_config((1,2,3,4,5,6,7,8,), light_blue, False)
start_MyButton.set_config((1,2,3,4,5,6,7,8,), red, False)
square_MyButton.set_config((5,), random, True)
triangle_MyButton.set_config((6,), random, True)
r1_MyButton.set_config((8,), random, True)
l1_MyButton.set_config((7,), random, True)
circle_MyButton.set_config((3,), random, True)
x_MyButton.set_config((4,), green, True)
l2_MyButton.set_config((2,), random, True)
r2_MyButton.set_config((1,), random, True)

ledOptions_led_buttons = [start_MyButton,select_MyButton]
ledOptions_start_time = 3
ledOptions_increase_brightness = [up_MyButton]
ledOptions_decrease_brightness = [down_MyButton]
ledOptions_left_button = [left_MyButton]
ledOptions_right_button = [right_MyButton]
ledOptions_confirm = [x_MyButton]
