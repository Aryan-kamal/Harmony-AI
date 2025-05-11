// Sensor read and distance calc
digitalWrite(trigPin, LOW);            // 1. Ensure the trigger pin is LOW to start clean
delayMicroseconds(2);                  // 2. Wait 2 µs so the sensor settles
digitalWrite(trigPin, HIGH);           // 3. Send a 10 µs HIGH pulse to the trigger pin
delayMicroseconds(10);                 // 4. Keep it HIGH for 10 µs (required to initiate the ultrasonic burst)
digitalWrite(trigPin, LOW);            // 5. Bring the trigger pin back LOW

duration = pulseIn(echoPin, HIGH);     // 6. Listen on the echo pin: measure how long it stays HIGH (round‐trip time)
distance = duration * 0.034 / 2;       // 7. Convert time (µs) to distance (cm):
                                       //    • sound speed ≈ 0.034 cm/µs  
                                       //    • divide by 2 because the pulse travels to the object and back

// Detection & gate logic
if (distance > 0 && distance < 30 && !carDetected) {  
                                       // 8. If we’ve got a valid reading under 30 cm 
                                       //    (i.e., a car is close) and we haven’t already counted it:
  carDetected = true;                  // 9. Mark that a car is now detected
  carCount++;                          // 10. Increment the total car count
  Serial.print("Car Entered! Total: ");
  Serial.println(carCount);            // 11. Print the updated count over serial for logging

  gateServo.write(90);                 // 12. Move the servo to 90° (open the gate)
  delay(2000);                         // 13. Wait 2 seconds while the gate stays open
  gateServo.write(0);                  // 14. Return the servo to 0° (close the gate)
  delay(1000);                         // 15. Wait 1 second before allowing another detection (debounce)
}

// Reset detection when no car
if (distance >= 30) {                  // 16. Once nothing is within 30 cm…
  carDetected = false;                 // 17. Clear the “car detected” flag so you can count the next one
}
