import supertest from "supertest";
import {expect}from "chai";

const request = supertest('http://localhost:3000/api')

const product = {
  "name": "test-product",
  "description": "test-product",
  "price": 100000,
  "stock": 10,
  "image": "test-product-url"
}

describe('Test Api RESTful', () => {

    describe('GET /productos', () => {
      it('Debe devolver status 200 y traer array de productos tipo JSON', async () => {
        const response = await request.get('/productos');
        expect(response.status).to.eql(200)
        expect('Content-Type', /json/);
        expect(response.body).to.be.an('array')
          
      });
    });

    describe('POST /productos', () => {
      it('Debe guardar un producto y devolver su Id y status 200', async () => {
      const response = await request.post('/productos').send(product);
        expect(response.status).to.eql(200);
        expect('Content-Type', /json/);
        product.id = response.body;
      })
    });

    describe('PUT /productos', () => {
      it('Debe Actualizar un producto y devolver un objeto con propiedad status y Id', async () => {
        const response = await request.put(`/productos/${product.id}`).send(product);
        expect(response.status).to.eql(201);
        expect('Content-Type', /json/);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.all.keys('status', 'id')
      })
    });

    describe('DELETE /productos', () => {
      it('Debe eliminar un producto y devolver un objeto con propiedad status y Id', async () => {
        const response = await request.delete(`/productos/${product.id}`);
        expect(response.status).to.eql(200);
        expect('Content-Type', /json/);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.all.keys('status', 'id')
      })
    })

  });