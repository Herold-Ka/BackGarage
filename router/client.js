const Express = require("express");
const router = Express.Router();

const db = require("../database/db");

router.post("/new", (req, res) => {
    const clientdata = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        tel: req.body.tel,
    };
    const marque = {
        marque: req.body.marque,
    };

    const cardata = {
        marqueId: null,
        modele: req.body.modele,
        type_moteur: req.body.type_moteur,
        numero_plaque: req.body.numero_plaque,
        annee: req.body.annee,
        couleur: req.body.couleur,
        clientId: null,
    };

    db.client
        .findOne({
            where: { email: req.body.email },
        })
        .then((client) => {
            if (!client) {
                db.client
                    .create(clientdata)
                    .then((data) => {
                        cardata.clientId = data.id;
                        db.marque
                            .findOne({
                                where: { marque: marque.marque },
                            })
                            .then((marques) => {
                                if (!marques) {
                                    db.marque
                                        .create(marque)
                                        .then((resmarque) => {
                                            cardata.marqueId = resmarque.id;
                                            db.voiture
                                                .findOne({
                                                    where: {
                                                        numero_plaque: cardata.numero_plaque,
                                                    },
                                                })
                                                .then((voiture) => {
                                                    if (!voiture) {
                                                        db.voiture
                                                            .create(cardata)
                                                            .then((voitures) => {
                                                                db.client
                                                                    .findOne({
                                                                        where: {
                                                                            id: cardata.clientId,
                                                                        },
                                                                        include: [{
                                                                            model: db.voiture,
                                                                            include: [{
                                                                                model: db.marque,
                                                                            }, ],
                                                                        }, ],
                                                                    })
                                                                    .then((resclient) => {
                                                                        res.json(resclient);
                                                                    })
                                                                    .catch((err) => {
                                                                        res.json(err);
                                                                    });
                                                            })
                                                            .catch((err) => {
                                                                res.json(err);
                                                            });
                                                    } else {
                                                        res.json({ error: "error" });
                                                    }
                                                })
                                                .catch((err) => {
                                                    res.json(err);
                                                });
                                        })
                                        .catch((err) => {
                                            res.json(err);
                                        });
                                } else {
                                    db.voiture
                                        .findOne({
                                            where: { numero_plaque: cardata.numero_plaque },
                                        })
                                        .then((datavoiture) => {
                                            if (!datavoiture) {
                                                db.voiture
                                                    .create(cardata)
                                                    .then(() => {
                                                        db.client
                                                            .findOne({
                                                                where: { id: cardata.clientId },
                                                                include: [{
                                                                    model: db.voiture,
                                                                    include: [{ model: db.marque }],
                                                                }, ],
                                                            })
                                                            .then((resclient) => {
                                                                res.json(resclient);
                                                            })
                                                            .catch((err) => {
                                                                res.json(err);
                                                            });
                                                    })
                                                    .catch((err) => {
                                                        res.json(err);
                                                    });
                                            } else {
                                                res.json("voiture déja dans la base");
                                            }
                                        })
                                        .catch((err) => {
                                            res.json(err);
                                        });
                                }
                            })
                            .catch((err) => {
                                res.json(err);
                            });
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            } else {
                cardata.clientId = client.id;
                db.marque
                    .findOne({ where: { marque: marque.marque } })
                    .then((itemmarque) => {
                        if (itemmarque) {
                            db.voiture
                                .findOne({
                                    where: { numero_plaque: cardata.numero_plaque },
                                })
                                .then((voiture) => {
                                    if (voiture) {
                                        res.json(voiture);
                                    } else {
                                        cardata.marqueId = itemmarque.id;
                                        db.voiture.create(cardata)
                                            .then((car) => {
                                                res.json(car);
                                            })
                                            .catch((err) => {
                                                res.json(err);
                                            })
                                    }
                                })
                                .catch((err) => {
                                    res.json(err);
                                })
                        } else {
                            db.marque.create(marque)
                                .then((marques) => {
                                    cardata.marqueId = marques.id;
                                    db.voiture.findOne({
                                            where: { numero_plaque: cardata.numero_plaque },
                                        })
                                        .then((itemvoiture) => {
                                            if (!itemvoiture) {
                                                db.voiture.create(cardata)
                                                    .then((car) => {
                                                        res.json(car);
                                                    })
                                                    .catch((err) => {
                                                        res.json(err);
                                                    })
                                            } else {
                                                res.json("impossible d'ajouter la voiture");
                                            }
                                        })
                                        .catch((err) => {
                                            res.json(err);
                                        })
                                })
                                .catch((err) => {
                                    res.json(err);
                                })
                        }
                    });
            }
        });
});