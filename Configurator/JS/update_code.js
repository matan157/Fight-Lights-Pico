function set_code()
{
  var header = "print(\"config\")\n\#Fight Lights Pico\n\nfrom machine import Pin\nfrom init import random, rainbow\nimport button\nimport functions\nimport init\n\n";

  //profile name
  var profile_name = document.getElementById("profile_name").value;
  var profile_name2 = 'profile_name = "'+profile_name+'"';

  //colors
  var colors = "";
  var colors_arr = "colors = [";
  var table = document.getElementById("color_table");
  for (var i = 1, row; row = table.rows[i]; i++) 
  {
      var col = row.innerText;
      col = col.split("\t");
      //console.log(col);
      colors += col[0] + ' = (' + col[1] + ',' + col[2] + ',' + col[3] + ')\n';

      if(col[0] != 'blank')
          colors_arr += col[0] + ",";
      
      
  }
  colors_arr = colors_arr.slice(0,-1);
  colors_arr += "]\n";
  if(colors_arr == "colors = ]\n")
      colors_arr = "colors = [blank]\n";

  //ledcount
  var led_count = document.getElementById("led_count").value;
  var led_count2 = "led_count = " + led_count;

  //pin_num
  var pin_num = document.getElementById("pin_num").value;
  var pin_num2 = "PIN_NUM = " + pin_num;

  //leniency
  var leniency = document.getElementById("leniency_tb").value;
  if(document.getElementById("leniency_cb").checked == true)
  {
      leniency = 0;
  }
  var leniency2 = "leniency = " + leniency;

  //brightness
  var brightness = document.getElementById("brightness").textContent;
  brightness /= 100;
  var brightness2 = "brightness_mod = " + brightness;

  //brightness steps
  var brightness_steps = document.getElementById("brightness_steps").value;
  brightness_steps = 1 / brightness_steps;
  var brightness_steps2 = "brightness_steps = " + brightness_steps;

  //idle mode
  var idle_mode = document.getElementById("idle_select").value;
  if(document.getElementById("idle_cb").checked == true)
  {
      idle_mode = 0;
  }
  var idle_mode2 = "idle_mode = " + idle_mode;

  //idle timer
  var idle_after = document.getElementById("idle_tb").value;
  var idle_after2 = "idle_after = " + idle_after;

  //save_stats
  var stats;
  if(document.getElementById("stats_cb").checked)
      stats = "True";
  else
      stats = "False";
  var stats2 = "save_stats = " + stats;

  //profile color
  var profile_color = "profile_color = (" + hexTorgb(document.getElementById("profile_color").value) + ")";

  //fade
  var fade_in = document.getElementById("fade_in").value;
  var fade_in2 = "fadein_speed = " + fade_in;

  var fade_out = document.getElementById("fade_out").value;
  var fade_out2 = "fadeout_speed = " + fade_out;

  //buttons
  var table = document.getElementById("button_table");
  var buttons = ""
  var button_list = 'button_list = [';

  for (var i = 1, row; row = table.rows[i]; i++) 
  {
    var gpio_pin = row.cells[4].childNodes[1].value;
    var col_name = row.innerText;
    col_name = col_name.split("\t");
    button_list += col_name[0] + '_MyButton,';
    buttons += col_name[0] + "_MyButton" + ' = button.MyButton(' + gpio_pin + ", '" + col_name[0] + "', functions.clear_led)\n";
  }

  button_list = button_list.slice(0,-1);
  if(button_list == "button_list = ")
    button_list = "button_list = ["
  button_list += "]\ninit.button_list_length = len(button_list)\n\n";

  //button colors
  var button_colors = "";
  for (var i = 1, row; row = table.rows[i]; i++) 
  {
    var fade = row.cells[3].childNodes[0].checked;
    var col_name = row.innerText;
    col_name = col_name.split("\t");
    var leds = col_name[1].replace(/[ ,]+/g, ",");
    leds += ",";
    if(leds == "Not,Set,")
      leds = "0,";
    if(fade)
      var fade2 = "True";
    else
      var fade2 = "False";
    button_colors += col_name[0] + "_MyButton" + ".set_config((" + leds + "), "+col_name[2] + ", " + fade2 + ")\n";
  }

  //clear bg
  if(document.getElementById("clear_bg_on_press").checked)
    var clear_bg = "clear_background_on_press = True"
  else
    var clear_bg = "clear_background_on_press = False"

  //background colors
  var background_color = "background = ("
  var background_table = document.getElementById("background_table");
  var bg_value = "";

  for (var i = 1, row; row = background_table.rows[i]; i++) 
  {
    var brightness_val = row.cells[2].innerHTML;
    brightness_val = brightness_val.slice(0,-1);

    var int_val = parseInt(brightness_val) / 100;

    bg_value += '(' + int_val + ',' +  background_table.rows[i].cells[1].innerHTML + ',' + background_table.rows[i].cells[0].innerHTML + '),';
     //var bg_value = ""; //table.rows[i].cells[2].innerHTML = document.getElementById("bg_brightness").value + '%';
  }
  bg_value = bg_value.slice(0,-1);
  background_color += bg_value + ')';

  //idle mode1 speed
  var idle_mode1_speed = document.getElementById("idle1_speed").value;
  var idle_mode1_speed2 = "idle_mode1_speed = " + idle_mode1_speed;

  //idle mode1 color
  //idle_mode1_colors = colors
  var idle_mode1_colors; 
  if(document.getElementById("circle_checkbox").checked)
    idle_mode1_colors = "idle_mode1_colors = colors";
  else
  {
    var idle1_table = document.getElementById("circle_table");
    idle_mode1_colors = "idle_mode1_colors = [";
    for (var i = 1, row; row = idle1_table.rows[i]; i++) 
    {
        var col = row.innerText;
        col = col.trim();
        idle_mode1_colors += col + ',';
    }
    idle_mode1_colors = idle_mode1_colors.slice(0,-1);
    idle_mode1_colors += "]";

    if(idle_mode1_colors == "idle_mode1_colors = ]")
      idle_mode1_colors = "idle_mode1_colors = []"
  }

  //led_options
  var led_options = "ledOptions_led_buttons = [";
  var led_options_table = document.getElementById("led_options_table");
  for (var i = 1, row; row = led_options_table.rows[i]; i++) 
  {
      var col = row.innerText;
      col = col.trim();
      //console.log(col);
      led_options += col + '_MyButton' + ',';
  }
  led_options = led_options.slice(0,-1);
  led_options += "]";
  if(led_options == "ledOptions_led_buttons = ]")
    led_options = "ledOptions_led_buttons = []";

  
  var led_options_start = "ledOptions_start_time = " + document.getElementById("led_options_start_time").value;

  var led_options_inc_brightness = "ledOptions_increase_brightness = [" + document.getElementById("led_options_inc_brightness").value + '_MyButton]'; 
  if(led_options_inc_brightness == "ledOptions_increase_brightness = [_MyButton]")
    led_options_inc_brightness = "ledOptions_increase_brightness = []"

  var led_options_dec_brightness = "ledOptions_decrease_brightness = [" + document.getElementById("led_options_dec_brightness").value + '_MyButton]'; 
  if(led_options_dec_brightness == "ledOptions_decrease_brightness = [_MyButton]")
    led_options_dec_brightness = "ledOptions_decrease_brightness = []"

  var led_options_left = "ledOptions_left_button = [" + document.getElementById("led_options_left").value + '_MyButton]'; 
  if(led_options_left == "ledOptions_left_button = [_MyButton]")
    led_options_left = "ledOptions_left_button = []"

  var led_options_right = "ledOptions_right_button = [" + document.getElementById("led_options_right").value + '_MyButton]'; 
  if(led_options_right == "ledOptions_right_button = [_MyButton]")
    led_options_right = "ledOptions_right_button = []"

  var led_options_confirm = "ledOptions_confirm = [" + document.getElementById("led_options_confirm").value + '_MyButton]'; 
  if(led_options_confirm == "ledOptions_confirm = [_MyButton]")
    led_options_confirm = "ledOptions_confirm = []"
  //console.log(led_options);


  //output
  document.getElementById("code_box").value = header 
                                              + colors + "\n"
                                              + colors_arr + "\n"
                                              + idle_mode1_colors + "\n"
                                              + idle_mode1_speed2 + "\n"
                                              + profile_name2 + "\n"
                                              + led_count2 + "\n" 
                                              + pin_num2 + "\n"
                                              + leniency2 + "\n"
                                              + brightness2 + "\n"
                                              + brightness_steps2 + "\n"
                                              + idle_mode2 + "\n"
                                              + idle_after2 + "\n"
                                              + stats2 + "\n"
                                              + "input_reset_time = 50\n"
                                              + profile_color + "\n"
                                              + clear_bg + "\n"
                                              + background_color + '\n'
                                              + fade_out2 + "\n"
                                              + fade_in2 + "\n"
                                              + buttons + '\n'
                                              + button_list + '\n'
                                              + button_colors + '\n'
                                              + led_options + '\n'
                                              + led_options_start + '\n'
                                              + led_options_inc_brightness + '\n'
                                              + led_options_dec_brightness + '\n'
                                              + led_options_left + '\n'
                                              + led_options_right + '\n'
                                              + led_options_confirm + '\n';
}

setInterval(function()
{ 
  set_code();                                        
}, 100);