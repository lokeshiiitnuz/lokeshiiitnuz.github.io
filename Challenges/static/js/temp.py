c = {
    "0": "btn-danger",
    "1": "btn-warning",
    "2": "btn-success",
    "3": "btn-primary",
}
i = 0
a = [0]
while(i < 5):
a.append(c[Math.floor(Math.random() * 4)])
print(c[a])
i++
