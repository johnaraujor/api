// init project
var express = require('express');
var { randomUUID } = require('crypto');
var fs = require('fs');
var app = express();

app.use(express.json());

let db = [];

function adduser() {
	fs.writeFile('dados.json', JSON.stringify(db), err => {
		if (err) {
			console.log();
		} else {
		}
	});
}

fs.readFile('dados.json', 'utf-8', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		db = JSON.parse(data);
	}
});

app.get('', function (req, res) {
	fs.readFile('home.html', function (err, data) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(data);
		return res.end();
	});
});

app.get('/api', function (req, res) {
	return res.json(db);
});
app.get('/api/:user', function (req, res) {
	const { user } = req.params;

	const result = db.find(use => use.user === user);

	if (db.find(use => use.user === user)) {
		return res.json(result);
	} else {
		return res.json({ error: 'User does not exist' });
	}
});

app.post('/api', function (req, res) {
	const { user, password } = req.body;
	const use = { id: randomUUID(), user, password };

	db.push(use);
	adduser();
	return res.json(use).status(200);
});

app.put('/api/:user', function (req, res) {
	const { user } = req.params;
	const userindix = db.findIndex(use => use.user === user);

	if (db.find(use => use.user === user)) {
		const { user, password } = req.body;
		db[userindix] = {
			...db[userindix],
			user,
			password
		};
		adduser();
		return res.json({ ok: 'ok' }).status(200);
	} else {
		return res.json({ error: 'User does not exist' });
	}
});

app.delete('/api/:user', function (req, res) {
	const { user } = req.params;
	const userindix = db.findIndex(use => use.user === user);

	if (db.find(use => use.user === user)) {
		db.splice(userindix, 1);
		adduser();
		return res.json({ ok: 'ok' }).status(200);
	} else {
		return res.json({ error: 'User does not exist' });
	}
});

// Listen on port 8080
var listener = app.listen(8080, function () {
	console.log('Listening on port ' + listener.address().port);
});
