from firebase import firebase
import random
from time import sleep

firebase = firebase.FirebaseApplication("https://project-iot-64868-default-rtdb.asia-southeast1.firebasedatabase.app/")

while True:
    firebase.put('https://project-iot-64868-default-rtdb.asia-southeast1.firebasedatabase.app/lampu','lampu_kamar', 'ON')
    firebase.put('https://project-iot-64868-default-rtdb.asia-southeast1.firebasedatabase.app/lampu','lampu_kamar_mandi', 'ON')
    firebase.put('https://project-iot-64868-default-rtdb.asia-southeast1.firebasedatabase.app/lampu','lampu_ruangan', 'ON')
    sleep(1)

# untuk mengupdate data secara realtime pada firebase 
