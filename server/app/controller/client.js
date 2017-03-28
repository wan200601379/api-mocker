const renderer = require('../../../dsl-core/index.js').renderer
const R = require('ramda')
module.exports = app => {
    class ClientController extends app.Controller {
        // get/:id
        * show () {
            const { id }= this.ctx.params
            const document = yield app.model.api.findOne({url: `/client/${id}`, "options.method": /get/i}).exec()
            if (document) {
                this.ctx.body = renderer(this.ctx.request.query)(document.dsl)
            }
        }
        // post /
        * create () {
            const document = yield app.model.api.findOne({url: this.ctx.request.url, "options.method": /post/i}).exec()
            if (document) {
                this.ctx.body = renderer(R.merge(this.ctx.request.body, this.ctx.request.params))(document.dsl)
            }
        }
    }

    return ClientController
}
