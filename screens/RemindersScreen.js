import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

const DayButton = ({ day, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.dayButton, selected && styles.selectedDayButton]}
    onPress={onPress}
  >
    <Text
      style={[styles.dayButtonText, selected && styles.selectedDayButtonText]}
    >
      {day}
    </Text>
  </TouchableOpacity>
);

const RemindersScreen = ({ navigation }) => {
  const [selectedHour, setSelectedHour] = useState(11);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [selectedAmPm, setSelectedAmPm] = useState("AM");
  const [selectedDays, setSelectedDays] = useState({
    SU: true,
    M: true,
    T: true,
    W: true,
    TH: false,
    F: false,
    S: false,
  });

  const handleDayPress = (day) => {
    setSelectedDays({
      ...selectedDays,
      [day]: !selectedDays[day],
    });
  };

  const incrementHour = () =>
    setSelectedHour((prev) => (prev === 12 ? 1 : prev + 1));
  const decrementHour = () =>
    setSelectedHour((prev) => (prev === 1 ? 12 : prev - 1));

  const incrementMinute = () =>
    setSelectedMinute((prev) => (prev === 59 ? 0 : prev + 1));
  const decrementMinute = () =>
    setSelectedMinute((prev) => (prev === 0 ? 59 : prev - 1));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>What time would you</Text>
        <Text style={styles.title}>like to meditate?</Text>
        <Text style={styles.subtitle}>
          Any time you can choose but We recommend first thing in th morning.
        </Text>

        <View style={styles.timePickerWrapper}>
          <View style={styles.timeColumn}>
            <TouchableOpacity onPress={incrementHour}>
              <Text style={styles.arrow}>▲</Text>
            </TouchableOpacity>
            <Text style={styles.timeValue}>{selectedHour}</Text>
            <TouchableOpacity onPress={decrementHour}>
              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.timeColon}>:</Text>

          <View style={styles.timeColumn}>
            <TouchableOpacity onPress={incrementMinute}>
              <Text style={styles.arrow}>▲</Text>
            </TouchableOpacity>
            <Text style={styles.timeValue}>
              {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
            </Text>
            <TouchableOpacity onPress={decrementMinute}>
              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.amPmColumn}>
            <TouchableOpacity
              style={[
                styles.amPmButton,
                selectedAmPm === "AM" && styles.amPmSelected,
              ]}
              onPress={() => setSelectedAmPm("AM")}
            >
              <Text
                style={[
                  styles.amPmText,
                  selectedAmPm === "AM" && styles.amPmSelectedText,
                ]}
              >
                AM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.amPmButton,
                selectedAmPm === "PM" && styles.amPmSelected,
              ]}
              onPress={() => setSelectedAmPm("PM")}
            >
              <Text
                style={[
                  styles.amPmText,
                  selectedAmPm === "PM" && styles.amPmSelectedText,
                ]}
              >
                PM
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>Which day would you</Text>
        <Text style={styles.title}>like to meditate?</Text>
        <Text style={styles.subtitle}>
          Everyday is best, but we recommend picking at least five.
        </Text>

        <View style={styles.daysContainer}>
          {["SU", "M", "T", "W", "TH", "F", "S"].map((day) => (
            <DayButton
              key={day}
              day={day}
              selected={selectedDays[day]}
              onPress={() => handleDayPress(day)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
          <Text style={styles.noThanksText}>NO THANKS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3F414E",
  },
  subtitle: {
    fontSize: 16,
    color: "#A1A4B2",
    marginTop: 10,
    marginBottom: 30,
  },
  timePickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    justifyContent: "center",
  },
  timeColumn: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  timeValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#3F414E",
    marginVertical: 8,
  },
  arrow: {
    fontSize: 18,
    color: "#A1A4B2",
  },
  timeColon: {
    fontSize: 30,
    fontWeight: "700",
    color: "#3F414E",
  },
  amPmColumn: {
    marginLeft: 20,
    justifyContent: "center",
  },
  amPmButton: {
    paddingVertical: 6,
  },
  amPmText: {
    fontSize: 16,
    color: "#A1A4B2",
    textAlign: "center",
  },
  amPmSelected: {},
  amPmSelectedText: {
    color: "#3F414E",
    fontWeight: "700",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A1A4B2",
  },
  selectedDayButton: {
    backgroundColor: "#3F414E",
    borderColor: "#3F414E",
  },
  dayButtonText: {
    fontSize: 14,
    color: "#3F414E",
  },
  selectedDayButtonText: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#8E97FD",
    borderRadius: 38,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  noThanksText: {
    fontSize: 14,
    color: "#3F414E",
    textAlign: "center",
  },
});

export default RemindersScreen;
