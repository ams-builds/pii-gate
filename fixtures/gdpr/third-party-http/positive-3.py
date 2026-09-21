def sync(user):
    requests.post("https://crm.example.com/contacts", json={"email": user.email})
