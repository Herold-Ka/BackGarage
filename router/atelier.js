const Express = require('express');
/**
 * Routing refers to determining how an application responds to a client request to a particular end point, which is a URL (or path) and a specific HTTP request method (GET, POST, and so on).
 * Each route can have one or more handler functions, which are executed when the route is matched.
 * Route definition takes the following structure:
 * route.METHOD (PATH, HANDLER)
 *
 * 
 *  GET : The GET method requests a representation of the specified resource. Requests using GET should only retrieve data and should have no other effect. (This is also true of some other HTTP methods.)[1] The W3C has published guidance principles on this distinction, saying, "Web application design should be informed by the above principles, but also by the relevant limitations."[22] See safe methods below.
 * HEAD : The HEAD method asks for a response identical to that of a GET request, but without the response body. This is useful for retrieving meta-information written in response headers, without having to transport the entire content.
 * POST : The POST method requests that the server accept the entity enclosed in the request as a new subordinate of the web resource identified by the URL. The data POSTed might be, for example, an annotation for existing resources; a message for a bulletin board, newsgroup, mailing list, or comment thread; a block of data that is the result of submitting a web form to a data-handling process; or an item to add to a database.[23]
 * PUT : The PUT method requests that the enclosed entity be stored under the supplied URI. If the URI refers to an already existing resource, it is modified; if the URI does not point to an existing resource, then the server can create the resource with that URI.[24]
 * DELETE : The DELETE method deletes the specified resource.
 * TRACE : The TRACE method echoes the received request so that a client can see what (if any) changes or additions have been made by intermediate servers.
 * OPTIONS : The OPTIONS method returns the HTTP methods that the server supports for the specified URL. This can be used to check the functionality of a web server by requesting '*' instead of a specific resource.
 * PATCH : The PATCH method applies partial modifications to a resource.
 *
 * @type { Router }
 */
const Atelier = Express.Router();

const db = require('../database/db');

Atelier.get("/FindALL", (req, res) => {


    db.atelier.findAll({})
        .then(atelier => {
            if (atelier) {
                res.json({
                    atelier: atelier
                })
            } else {
                res.json({ error: '404 not found' })
            }
        })
        .catch(err => {
            res.json("error" + err);
        })
});

Atelier.put('path', (req, res) => {

});



Atelier.post("/ajouter", (req, res) => {
    var ateliers = {
        nom: req.body.nom,
        garageId: 1
    };
    db.atelier.create(ateliers)
        .then(rep => {
            res.json({ message: 'ok', rep })
        })
        .catch(err => {
            res.json({ error: 'error' + err })
        })

});
Atelier.delete("/delete/:id", (req, res) => {
    // find the atelier and delete
    db.atelier.findOne({
            where: { id: req.params.id }
        }).then(atelier => {
            // if atelier exist so 
            if (atelier) {
                atelier.destroy().then(() => {
                        res.json("atelier deleted")
                    })
                    .catch(err => {
                        res.json("error" + err)
                    })
            } else {
                res.json({
                    error: "you can't delete this  atelier " +
                        "it not exist in you list of atelier "
                })
            }

        })
        .catch(err => {
            // send back the message error 
            res.json("error" + err);
        })
});
module.exports = Atelier;