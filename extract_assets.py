import email
import os
from email import policy
import base64

def extract_attachments(eml_path, output_dir):
    with open(eml_path, 'rb') as f:
        msg = email.message_from_binary_file(f, policy=policy.default)
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    for part in msg.walk():
        if part.get_content_maintype() == 'multipart':
            continue
        if part.get('Content-Disposition') is None:
            continue
            
        filename = part.get_filename()
        if filename:
            filepath = os.path.join(output_dir, filename)
            with open(filepath, 'wb') as f:
                f.write(part.get_payload(decode=True))
            print(f"Extracted {filename} to {output_dir}")

# Extract for Ohler
extract_attachments(
    'src/assets/Info_PartnerWeingüter/raw_email_responses/Re: Foto+Motto.eml',
    'src/assets/Info_PartnerWeingüter/Ohler'
)

# Extract for Locker
extract_attachments(
    'src/assets/Info_PartnerWeingüter/raw_email_responses/Re: Webseiten-Link.eml',
    'src/assets/Info_PartnerWeingüter/Locker'
)

# Extract for Bergdolt-Reif & Nett (if any, though none was specifically mentioned as attachment, but maybe in CID)
extract_attachments(
    'src/assets/Info_PartnerWeingüter/raw_email_responses/Re: Werbefoto+Motto.eml',
    'src/assets/Info_PartnerWeingüter/Bergdolt_Reif_Nett'
)
