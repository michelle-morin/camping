import { finalizeTrip } from './finalize.js';
import { initializePage, addCamper, addKnownItem, addOtherItem } from './add-items.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  initializePage();
  addCamper();
  addKnownItem();
  addOtherItem();
  finalizeTrip();
});