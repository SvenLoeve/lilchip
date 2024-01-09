import nfc
import re
import subprocess


class ReadNFC:

    def __init__(self):
        self.tag = None
        self.clf = nfc.ContactlessFrontend('usb')

    def on_connect(self, tag):
        print("Connected to NFC tag:" + str(tag))

    def extract_info_from_ndef_records(self, ndef_records_str):
        try:
            name_match = re.search(r'name:"([^"]+)"', ndef_records_str)
            lastName_match = re.search(r'lastName:"([^"]+)"', ndef_records_str)
            dateOfBirth_match = re.search(r'dateOfBirth:"([^"]+)"', ndef_records_str)
            placeOfResidence_match = re.search(r'placeOfResidence:"([^"]+)"', ndef_records_str)
            phoneNumber_match = re.search(r'phoneNumber:"([^"]+)"', ndef_records_str)
            emergencyContact_match = re.search(r'emergencyContact:"([^"]+)"', ndef_records_str)
            emergencyContactNumber_match = re.search(r'emergencyContactNumber:"([^"]+)"', ndef_records_str)
            alergies_match = re.search(r'alergies:"([^"]+)"', ndef_records_str)
            medication_match = re.search(r'medication:"([^"]+)"', ndef_records_str)
            implants_match = re.search(r'implants:"([^"]+)"', ndef_records_str)

            name = name_match.group(1) if name_match else None
            lastName = lastName_match.group(1) if lastName_match else None
            dateOfBirth = dateOfBirth_match.group(1) if dateOfBirth_match else None
            placeOfResidence = placeOfResidence_match.group(1) if placeOfResidence_match else None
            phoneNumber = phoneNumber_match.group(1).strip() if phoneNumber_match else None
            emergencyContact = emergencyContact_match.group(1) if emergencyContact_match else None
            emergencyContactNumber = emergencyContactNumber_match.group(1) if emergencyContactNumber_match else None
            alergies = alergies_match.group(1) if alergies_match else None
            medication = medication_match.group(1) if medication_match else None
            implants = implants_match.group(1) if implants_match else None

            return name, lastName, dateOfBirth, placeOfResidence, phoneNumber, emergencyContact, emergencyContactNumber, alergies, medication, implants
        except Exception as e:
            print(f"Error extracting information: {e}")
            return None, None, None, None, None, None, None, None, None, None

    def read_chip_from_reader(self):
        try:
            print("Waiting for an NFC chip...")

            while True:
                self.tag = self.clf.connect(rdwr={'on-connect': self.on_connect})
                if self.tag:
                    ndef_records_str = str(self.tag.ndef.records)
                    (name, lastName, dateOfBirth, placeOfResidence, phoneNumber,
                     emergencyContact, emergencyContactNumber, alergies, medication,
                     implants) = self.extract_info_from_ndef_records(ndef_records_str)

                    data_dict = {
                        "UID": self.tag.identifier.hex(),
                        "name": name,
                        "lastName": lastName,
                        "dateOfBirth": dateOfBirth,
                        "placeOfResidence": placeOfResidence,
                        "phoneNumber": phoneNumber,
                        "emergencyContact": emergencyContact,
                        "emergencyContactNumber": emergencyContactNumber,
                        "alergies": alergies,
                        "medication": medication,
                        "implants": implants
                    }

                    print(data_dict)
                    subprocess.run(['pnputil', '/restart-device', "USB\\VID_072F&PID_2200"])
                    return data_dict

        except KeyboardInterrupt:
            pass
