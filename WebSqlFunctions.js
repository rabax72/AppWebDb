if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 5 x 1024 x 1024 = 5MB
    var mydb = openDatabase("appdoldi_db", "0.1", "Il DB dei Distributori Doldi", 5 * 1024 * 1024);

    var strutturaClienti = "CREATE TABLE IF NOT EXISTS clienti (" +
                      "IdCliente int(11) NOT NULL," +
                      "Descrizione varchar(255) NOT NULL," +
                      "Indirizzo varchar(255) DEFAULT NULL," +
                      "DataInserimento timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                      "DataModifica datetime DEFAULT NULL," +
                      "Cancellato tinyint(1) NOT NULL DEFAULT '0'," +
                      "IdOperatore int(11) NOT NULL," +
                      "ordine int(11) DEFAULT NULL," +
                      "PRIMARY KEY (IdCliente)" +
                    ");";

    var valoriClienti = "INSERT INTO clienti (IdCliente, Descrizione, Indirizzo, DataInserimento, DataModifica, Cancellato, IdOperatore, ordine) VALUES" +
                        "(1, 'GELATERIA CARAIBI', 'via emilio lepido 9/a/b', '2015-01-06 14:16:59', NULL, 0, 1, NULL)," +
                        "(2, 'LA GELATERIA', 'piazzale vittorio emanuele II, 17', '2015-01-06 14:17:11', NULL, 0, 1, NULL)," +
                        "(3, 'GELATERIA CARAIBI''S', 'via silvio pellico 10/c', '2015-01-06 14:17:21', NULL, 0, 1, NULL)," +
                        "(4, 'GELATERIA IL POLO', NULL, '2015-03-21 18:56:58', NULL, 0, 1, NULL)," +
                        "(5, 'PASTICCERIA FIORENTINA', NULL, '2015-03-21 18:57:21', NULL, 0, 1, NULL)," +
                        "(6, 'BAR BIG BANG s.n.c.', 'Via bixio 96/a', '2015-03-21 18:57:37', NULL, 0, 1, NULL)," +
                        "(7, 'AGRIGELATERIA PRIMO FIORE', 'Via Umberto I', '2015-03-26 06:43:12', NULL, 0, 1, NULL)," +
                        "(8, 'Bar da Emma di Pinazzi Pier Luigi', 'via traversetolo 161', '2015-03-26 06:44:53', NULL, 0, 1, NULL)," +
                        "(9, 'BB BAKERY DI DANILO MICHELOTTI & C. S.N.C.', 'Strada Nino Bixio, 41', '2015-03-26 06:46:07', NULL, 0, 1, NULL)," +
                        "(10, 'BIONOVA SNC', 'Via roma 100', '2015-03-26 06:46:39', NULL, 0, 1, NULL)," +
                        "(11, 'Gelateria al Polo Parma di Rossi Marco', 'via spezia 14/a', '2015-03-26 06:47:37', NULL, 0, 1, NULL)," +
                        "(12, 'GELATERIA MALIBU di Catellani Chiara', 'via martiri della libertà 5', '2015-03-27 08:23:49', NULL, 0, 1, NULL)," +
                        "(13, 'GELATERIA SOLEBLU', 'via traversetolo 187/b', '2015-03-27 08:24:27', NULL, 0, 1, NULL)," +
                        "(14, 'LA FRUTTERIA di Volpi Annamaria', 'via roma 9, noceto', '2015-03-27 08:25:17', NULL, 0, 1, NULL)," +
                        "(15, 'LA PIAZZETTA DEI CARAIBI S.N.C.', 'via mansfield 1/d', '2015-03-27 08:26:55', NULL, 0, 1, NULL)," +
                        "(16, 'LA SFOGLIA DI OPPICI ANGELICA', 'via garibaldi', '2015-03-27 08:28:26', NULL, 0, 1, NULL)," +
                        "(17, 'PANETTERIA SACCANI', 'Via fratelli cervi 31, fontevivo', '2015-03-27 08:29:46', NULL, 0, 1, NULL)," +
                        "(18, 'RISTORANTE PIZZERIA MARY JOY DI FOIS MARIA GRAZIA', 'Via san martino 40, medesano', '2015-03-27 08:31:00', NULL, 0, 1, NULL)," +
                        "(19, '1000', NULL, '2015-03-28 07:43:47', NULL, 0, 1, 1000)," +
                        "(20, 'SANE E PANOS', 'piazza garibaldi 19/e, parma', '2015-03-28 08:38:08', NULL, 0, 1, NULL);";

    var strutturaDistributori = "CREATE TABLE IF NOT EXISTS distributori (" +
                      "IdDistributore int(11) NOT NULL," +
                      "CodGettoniera varchar(11) DEFAULT NULL," +
                      "Sigla varchar(2) DEFAULT NULL," +
                      "Descrizione varchar(255) DEFAULT NULL," +
                      "Indirizzo varchar(255) DEFAULT NULL," +
                      "Latitudine decimal(11,8) DEFAULT '0.00000000'," +
                      "Longitudine decimal(11,8) DEFAULT '0.00000000'," +
                      "DataInserimento timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                      "Citta varchar(50) DEFAULT NULL," +
                      "ordine int(11) DEFAULT NULL," +
                      "PRIMARY KEY (IdDistributore)" +
                    ")";

    var valoriDistributori = "INSERT INTO distributori (IdDistributore, CodGettoniera, Sigla, Descrizione, Indirizzo, Latitudine, Longitudine, DataInserimento, Citta, ordine) VALUES" +
                                "(1, '4949GA02273', 'SC', 'PL SANTA CROCE', 'piazzale santa croce, parma', '0.00000000', '0.00000000', '2014-12-29 19:51:47', 'PARMA', 1)," +
                                "(3, '4749GA01392', 'MB', 'VIA MONTEBELLO', 'via montebello, parma', '0.00000000', '0.00000000', '2015-01-04 11:28:30', 'PARMA', 7)," +
                                "(4, '4949GA02270', 'MA', 'VIA MANTOVA', 'via mantova, parma', '0.00000000', '0.00000000', '2015-01-04 11:28:57', 'PARMA', 5)," +
                                "(5, '4949GA02281', 'MO', 'VIA MONTANARA', 'via montanara, parma', '0.00000000', '0.00000000', '2015-01-04 11:29:27', 'PARMA', 8)," +
                                "(6, '3919G302642', 'SL', 'SAN LAZZARO', 'via emilio lepido, parma', '0.00000000', '0.00000000', '2015-01-04 11:30:57', 'PARMA', 6)," +
                                "(7, '4339G400431', 'TT', 'TOM TOM', 'via san leonardo, parma', '0.00000000', '0.00000000', '2015-01-04 11:32:33', 'PARMA', 12)," +
                                "(8, '3919G302637', 'ME', 'VIA MANSFIELD ', 'via mensfield, parma', '0.00000000', '0.00000000', '2015-01-04 11:33:25', 'PARMA', 13)," +
                                "(9, '1819G401953', 'SP', 'VIA SPEZIA (FORNAIO)', 'via spezia 23/a, parma', '0.00000000', '0.00000000', '2015-01-14 19:43:29', 'PARMA', 10)," +
                                "(10, '3919G302634', 'BO', 'BOTTEGHINO', 'via traversetolo 185/a, parma', '0.00000000', '0.00000000', '2015-01-14 19:44:25', 'PARMA', 14)," +
                                "(11, 'SP0811', 'PT', 'PONTE TARO', 'via madre teresa di calcutta, noceto', '0.00000000', '0.00000000', '2015-01-14 19:45:44', 'PONTE TARO', 15)," +
                                "(13, '1529G302159', 'PF', 'PIAZZA FIUME', 'piazza fiume, reggio emilia', '0.00000000', '0.00000000', '2015-01-14 19:47:37', 'REGGIO EMILIA', 18)," +
                                "(14, '1329G300839', 'UM', 'VIALE UMBERTO I', 'viale umberto I 36, reggio emilia', '0.00000000', '0.00000000', '2015-01-14 19:48:52', 'REGGIO EMILIA', 19)," +
                                "(15, '1529G302158', 'BE', 'CAPRETTE', 'viale martiri della bettola, reggio emilia', '0.00000000', '0.00000000', '2015-01-14 19:50:14', 'REGGIO EMILIA', 20)," +
                                "(17, '2649G900661', 'GB', 'VIA GARIBALDI', 'via garibaldi 71/d, parma', '0.00000000', '0.00000000', '2015-03-15 14:36:26', 'PARMA', 2)," +
                                "(18, '4339G400427', 'SP', 'CARAIBI''S', 'via silvio pellico 10/c, parma', '0.00000000', '0.00000000', '2015-03-15 14:39:12', 'PARMA', 11)," +
                                "(19, '1819G401954', 'SP', 'VIA SPEZIA', 'via spezia, parma', '0.00000000', '0.00000000', '2015-03-18 17:10:32', 'PARMA', 9)," +
                                "(20, '3919G302638', 'MC', 'VIA MARTIRI CERVAROLO', 'via martiri cervarolo, Reggio Emilia', '0.00000000', '0.00000000', '2015-03-18 17:13:25', 'REGGIO EMILIA', 21)," +
                                "(21, '1819G401962', 'DN', 'QUESTURA', 'via dante alighieri, Reggio Emilia', '0.00000000', '0.00000000', '2015-03-18 17:17:21', 'REGGIO EMILIA', 23)," +
                                "(22, '2539G301741', 'ES', 'STAZIONE', 'via emilia san pietro, Reggio Emilia', '0.00000000', '0.00000000', '2015-03-18 17:18:44', 'REGGIO EMILIA', 22)," +
                                "(23, '2539G301735', 'VF', 'SANT'' ILARIO', 'VIA FERRARI, reggio Emilia', '0.00000000', '0.00000000', '2015-03-21 17:06:39', 'SANT'' ILARIO REGGIO EMILIA', 16)," +
                                "(26, '2539G301726', 'CE', 'CEDACRI', 'COLLECCHIO', '0.00000000', '0.00000000', '2015-07-01 17:24:35', 'PARMA', 24)," +
                                "(27, '1859GA02086', 'BR', 'BARRIERA REPUBBLICA', 'PL VITTORIO EMANUELE', '0.00000000', '0.00000000', '2015-09-11 16:35:18', 'PARMA', 4)," +
                                "(24, '1819G401957', 'MG', 'MAGENTA', 'via verdi, reggio emilia', '0.00000000', '0.00000000', '2015-03-27 17:51:15', 'REGGIO EMILIA', 17)," +
                                "(25, '1559GA02455', 'PG', 'PIAZZA GARIBALDI', 'PIAZZA GARIBALDI', '0.00000000', '0.00000000', '2015-06-04 16:56:20', 'PARMA', 3)," +
                                "(28, '4949GA02271', 'CO', 'COLLECCHIO', 'VIALE SARAGAT', '0.00000000', '0.00000000', '2015-09-21 10:21:51', 'COLLECCHIO', 25)," +
                                "(29, '1819G401961', 'CO', 'CORCAGNANO', NULL, '0.00000000', '0.00000000', '2015-10-10 10:45:48', 'PARMA', 29);";

    var strutturaMezzi = "CREATE TABLE IF NOT EXISTS mezzi (" +
                                 "IdMezzo int(11) NOT NULL," +
                                 "Descrizione varchar(255) NOT NULL," +
                                 "ordine int(11) NOT NULL," +
                                 "PRIMARY KEY (IdMezzo)" +
                           ")";

    var valoriMezzi = "INSERT INTO mezzi (IdMezzo, Descrizione, ordine) VALUES" +
                    "(1, 'Camion 1', 1)," +
                    "(2, 'Camion 2', 2);";

    var strutturaOperatori = "CREATE TABLE IF NOT EXISTS operatori (" +
                              "IdOperatore int(11) NOT NULL," +
                              "Nome varchar(100) DEFAULT NULL," +
                              "Cognome varchar(100) DEFAULT NULL," +
                              "Email varchar(100) DEFAULT NULL," +
                              "User varchar(20) NOT NULL," +
                              "Password varchar(20) NOT NULL," +
                              "Ruolo varchar(20) DEFAULT NULL," +
                              "PRIMARY KEY (IdOperatore)" +
                            ")";

    var valoriOperatori = "INSERT INTO operatori (IdOperatore, Nome, Cognome, Email, User, Password, Ruolo) VALUES" +
                            "(1, 'Giacomo', 'Rabaglia', 'rabax@hotmail.com', 'jake', 'admin', 'admin')," +
                            "(2, 'Sara', 'Soncini', 'sdff', 'doldi', 'doldi', 'vettore')," +
                            "(3, 'Gianni', 'Gianni', 'aa@bb.it', 'vettore', 'vettore', 'vettore')," +
                            "(4, 'Sara', 'Soncini', 'sara', 'sara', 'preppy2003', 'admin');";

    var strutturaProdotti = "CREATE TABLE IF NOT EXISTS prodotti (" +
                              "IdProdotto int(11) NOT NULL," +
                              "Descrizione varchar(255) NOT NULL," +
                              "Foto varchar(255) DEFAULT ''''''," +
                              "Prezzo decimal(8,2) NOT NULL DEFAULT '0.00'," +
                              "Aliquota int(11) NOT NULL," +
                              "DataProduzione date DEFAULT NULL," +
                              "DataScadenza date DEFAULT NULL," +
                              "DataInserimento timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                              "DataUltimaModifica datetime DEFAULT NULL," +
                              "cancellato tinyint(1) NOT NULL DEFAULT '0'," +
                              "Ordine int(11) DEFAULT NULL," +
                              "PRIMARY KEY (IdProdotto)" +
                            ")";
    
    var valoriProdotti = "INSERT INTO prodotti (IdProdotto, Descrizione, Foto, Prezzo, Aliquota, DataProduzione, DataScadenza, DataInserimento, DataUltimaModifica, cancellato, Ordine) VALUES" +
                            "(1, 'Acqua Minerale Naturale 50cl', 'acqua.jpg', '0.70', 22, '2014-12-01', '2015-12-01', '2014-12-26 23:00:00', '0000-00-00 00:00:00', 0, 6)," +
                            "(2, 'Biscotti al Cioccolato conf. 100g', 'biscottiCioccolato.jpg', '1.30', 10, '2014-12-01', '2015-01-21', '2014-12-26 23:00:00', '2014-12-27 00:00:00', 0, 9)," +
                            "(3, 'Biscotti bianchi al latte conf. 100g', 'biscottiBianchi.jpg', '1.00', 10, '2014-12-01', '2014-12-31', '2014-12-27 23:00:00', '2014-12-28 00:00:00', 0, 10)," +
                            "(4, 'Formaggio Parmigiano Reggiano 200gr', 'formaggio200g.jpg', '3.50', 10, '2014-12-21', '2015-01-15', '2014-12-27 23:00:00', '2014-12-28 00:00:00', 0, 7)," +
                            "(5, 'Formaggio Parmigiano Reggiano 500g', 'formaggio500g (1).jpg', '6.50', 10, '0001-01-01', '0001-01-01', '2015-01-04 11:08:35', NULL, 0, 25)," +
                            "(6, 'Grissoni 8 Cereali 100g', 'rsz_image.png', '1.30', 10, NULL, NULL, '2015-01-04 11:14:11', NULL, 0, 13)," +
                            "(7, 'Grissoni bianchi conf. 100g', 'grissoni100g.jpg', '1.00', 10, NULL, NULL, '2015-01-04 11:15:33', NULL, 0, 14)," +
                            "(8, 'Yogurt naturale bott. 100 g', 'yogurtNaturale.jpg', '1.00', 10, NULL, NULL, '2015-01-04 11:16:16', NULL, 0, 2)," +
                            "(9, 'Yogurt Fragola bott. 500g', 'yogurtFragola.jpg', '1.50', 10, NULL, NULL, '2015-01-04 11:16:49', NULL, 0, 3)," +
                            "(10, 'Yogurt Frutti di Bosco bott. 500g', 'yogurtFruttiBosco.jpg', '1.50', 10, NULL, NULL, '2015-01-04 11:17:42', NULL, 0, 4)," +
                            "(11, 'Yogurt caffe bott. 500g', 'yogurtCaffe.jpg', '1.50', 10, NULL, NULL, '2015-01-04 11:18:09', NULL, 0, 5)," +
                            "(12, 'Muffin Cuore di cioccolato', 'muffin.jpg', '1.20', 10, NULL, NULL, '2015-01-04 11:18:36', NULL, 0, 11)," +
                            "(13, 'Latte 1L', 'latte.jpg', '1.20', 10, NULL, NULL, '2015-01-04 11:19:25', NULL, 0, 1)," +
                            "(14, 'Crostatine', 'Crostatina.jpg', '1.20', 10, NULL, NULL, '2015-03-08 21:53:03', NULL, 0, 8)," +
                            "(15, 'Schiacciatine', 'Schiacciatina.jpg', '1.00', 10, NULL, NULL, '2015-03-08 21:53:03', NULL, 0, 15)," +
                            "(16, 'Succo di frutta', 'As3GHCCWvpBq5B65wy24KhCDBAoblG7h3vMDHJi2cehI_100x134.jpg', '1.00', 22, NULL, NULL, '2015-03-11 22:45:02', NULL, 0, 12)," +
                            "(17, 'Grattugiato 100g', 'grattugiato100.jpg', '2.00', 10, NULL, NULL, '2015-03-22 12:23:22', NULL, 0, 16)," +
                            "(18, 'Caciotella', 'Ap54jHN81asKakBvyoXSq5FJ5zK2rN0HHvsczwD2l4cr_100x75.jpg', '2.10', 10, NULL, NULL, '2015-06-04 16:36:37', NULL, 0, 18)," +
                            "(19, 'PRIMOSALE', 'AtBoPHGaFIRp-bBOp5l2GtBfh3LVjYAuxR7jrm6DGm3G_100x75.jpg', '2.60', 10, NULL, NULL, '2015-06-09 06:00:29', NULL, 0, 19)," +
                            "(21, 'ESTATE'' ', 'Te.jpg', '0.80', 22, NULL, NULL, '2015-07-26 18:29:57', NULL, 0, 20);";

    var strutturaSituazioneClienti = "CREATE TABLE IF NOT EXISTS situazioneclienti (" + 
                                      "IdSituazioneCliente int(11) NOT NULL," + 
                                      "IdCliente int(11) NOT NULL," + 
                                      "IdProdotto int(11) NOT NULL," + 
                                      "NumeroLotto date DEFAULT NULL," + 
                                      "Quantita int(11) NOT NULL," + 
                                      "PrezzoTotale decimal(8,2) NOT NULL," + 
                                      "DataInserimento timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," + 
                                      "DataModifica datetime DEFAULT NULL," + 
                                      "Modificato tinyint(1) NOT NULL DEFAULT '0'," + 
                                      "IdOperatore int(11) NOT NULL," + 
                                      "NumeroDDT int(11) DEFAULT NULL," + 
                                      "DataDDT datetime DEFAULT NULL," + 
                                      "colore varchar(10) NOT NULL," + 
                                      "PRIMARY KEY (IdSituazioneCliente)" +
                                    ")";

    var valoriSituazioneClienti = "INSERT INTO situazioneclienti (IdSituazioneCliente, IdCliente, IdProdotto, NumeroLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES" +
                                    "(88, 6, 13, NULL, 3, '3.60', '2015-07-28 10:24:28', '2015-10-10 10:11:18', 1, 2, NULL, NULL, '')," +
                                    "(89, 8, 13, NULL, 8, '9.60', '2015-07-28 10:24:47', '2015-10-10 10:11:48', 1, 2, NULL, NULL, '')," +
                                    "(90, 9, 13, NULL, 5, '6.00', '2015-07-28 10:25:02', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(91, 6, 13, NULL, 3, '3.60', '2015-07-30 08:24:49', '2015-10-10 10:11:18', 1, 2, NULL, NULL, '')," +
                                    "(92, 9, 13, NULL, 6, '7.20', '2015-07-30 08:25:33', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(94, 9, 13, NULL, 6, '7.20', '2015-08-01 06:04:29', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(93, 8, 13, NULL, 5, '6.00', '2015-08-01 06:03:24', '2015-10-10 10:11:48', 1, 2, NULL, NULL, '')," +
                                    "(95, 8, 13, NULL, 5, '6.00', '2015-08-04 06:39:06', '2015-10-10 10:11:48', 1, 2, NULL, NULL, '')," +
                                    "(96, 9, 13, NULL, 8, '9.60', '2015-08-15 04:41:32', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(97, 9, 13, NULL, 7, '8.40', '2015-08-18 04:35:37', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(98, 9, 13, NULL, 7, '8.40', '2015-08-20 04:26:36', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(99, 9, 13, NULL, 8, '9.60', '2015-08-22 04:53:37', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(100, 9, 13, NULL, 6, '7.20', '2015-08-25 04:07:29', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(101, 6, 13, NULL, 4, '4.80', '2015-08-25 04:07:49', '2015-10-10 10:11:18', 1, 2, NULL, NULL, '')," +
                                    "(127, 9, 13, NULL, 12, '14.40', '2015-09-19 04:37:05', '2015-10-10 10:11:32', 1, 2, NULL, NULL, 'verde')," +
                                    "(102, 9, 13, NULL, 6, '7.20', '2015-08-27 04:16:30', '2015-10-10 10:11:32', 1, 2, NULL, NULL, '')," +
                                    "(126, 6, 13, NULL, 7, '8.40', '2015-09-17 04:11:37', '2015-10-10 10:11:18', 1, 2, NULL, NULL, 'verde');";

    var strutturaSituazioneDistributori = "CREATE TABLE IF NOT EXISTS situazionedistributori (" +
                                              "IdSituazioneDistributore int(11) NOT NULL," +
                                              "IdDistributore int(11) NOT NULL," +
                                              "IdProdotto int(11) NOT NULL," +
                                              "NumeroLotto date DEFAULT NULL," +
                                              "Quantita int(11) NOT NULL," +
                                              "PrezzoTotale decimal(8,2) NOT NULL," +
                                              "DataInserimento timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                                              "DataModifica datetime DEFAULT NULL," +
                                              "Modificato tinyint(1) NOT NULL DEFAULT '0'," +
                                              "IdOperatore int(11) NOT NULL," +
                                              "NumeroDDT int(11) DEFAULT NULL," +
                                              "DataDDT datetime DEFAULT NULL," +
                                              "colore varchar(10) DEFAULT NULL," +
                                              "PRIMARY KEY (IdSituazioneDistributore)" +
                                            ")";

    var valoriSituazioneDistributori = "INSERT INTO situazionedistributori (IdSituazioneDistributore, IdDistributore, IdProdotto, NumeroLotto, Quantita, PrezzoTotale, DataInserimento, DataModifica, Modificato, IdOperatore, NumeroDDT, DataDDT, colore) VALUES" +
                                        "(9140, 7, 13, NULL, 52, '2337.60', '2015-07-24 23:39:40', '2015-10-10 00:56:03', 1, 2, NULL, NULL, NULL)," +
                                        "(9141, 7, 8, NULL, 18, '482.00', '2015-07-24 23:39:46', '2015-10-10 00:56:03', 1, 2, NULL, NULL, NULL)," +
                                         "   (9142, 7, 9, NULL, 12, '132.00', '2015-07-24 23:39:51', '2015-10-10 00:56:03', 1, 2, NULL, NULL, NULL)," +
                                         "   (9143, 7, 10, NULL, 1, '148.50', '2015-07-24 23:39:57', '2015-10-10 00:54:51', 1, 2, NULL, NULL, NULL)," +
                                         "   (9144, 7, 11, NULL, 6, '141.00', '2015-07-24 23:40:08', '2015-10-10 00:54:50', 1, 2, NULL, NULL, NULL)," +
                                         "   (9145, 7, 4, NULL, 6, '504.00', '2015-07-24 23:40:16', '2015-10-08 01:30:34', 1, 2, NULL, NULL, NULL)," +
                                         "   (9146, 7, 14, NULL, 2, '117.60', '2015-07-24 23:40:20', '2015-10-01 09:20:51', 1, 2, NULL, NULL, NULL)," +
                                         "   (9147, 7, 2, NULL, 5, '253.50', '2015-07-24 23:40:25', '2015-10-01 09:20:51', 1, 2, NULL, NULL, NULL);";

    var strutturaVenduto = "CREATE TABLE IF NOT EXISTS venduto (" +
                              "IdVendita int(11) NOT NULL ," +
                              "IdProdotto int(11) NOT NULL," +
                              "IdDistributore int(11) NOT NULL," +
                              "Quantita int(11) NOT NULL," +
                              "PrezzoTotale decimal(8,2) NOT NULL," +
                              "DataRilevazione timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                              "IdOperatore int(11) NOT NULL," +
                              "IdCliente int(11) DEFAULT NULL," +
                              "VenditaDiretta tinyint(1) DEFAULT '0'," +
                              "numeroDDT int(11) DEFAULT NULL," +
                              "DataDDT datetime DEFAULT NULL," +
                              "NumeroLotto datetime DEFAULT NULL," +
                              "note varchar(50) DEFAULT NULL," +
                              "PRIMARY KEY (IdVendita)" +
                            ") ";

    var valoriVenduto = "INSERT INTO venduto (IdVendita, IdProdotto, IdDistributore, Quantita, PrezzoTotale, DataRilevazione, IdOperatore, IdCliente, VenditaDiretta, numeroDDT, DataDDT, NumeroLotto, note) VALUES" +
                        "(3576, 13, 7, 23, '27.60', '2015-07-25 23:59:59', 2, 0, 0, NULL, NULL, NULL, NULL)," +
                        "(3577, 8, 7, 6, '6.00', '2015-07-26 00:00:39', 2, 0, 0, NULL, NULL, NULL, NULL)," +
                        "(3578, 9, 7, 5, '7.50', '2015-07-26 00:00:49', 2, 0, 0, NULL, NULL, NULL, NULL)," +
                        "(3579, 10, 7, 1, '1.50', '2015-07-26 00:00:55', 2, 0, 0, NULL, NULL, NULL, NULL)," +
                        "(3580, 3, 7, 1, '1.00', '2015-07-26 00:01:19', 2, 0, 0, NULL, NULL, NULL, NULL)," +
                        "(3581, 7, 7, 1, '1.00', '2015-07-26 00:01:31', 2, 0, 0, NULL, NULL, NULL, NULL);";

    var strutturaMark = "CREATE TABLE IF NOT EXISTS mark (" +
                          "Id int(11) NOT NULL," +
                          "CodiceGettoniera varchar(20) DEFAULT NULL," +
                          "Venduto int(11) DEFAULT NULL," +
                          "InviatoInCassa int(11) DEFAULT NULL," +
                          "dataRilevazione varchar(6) DEFAULT NULL," +
                          "oraRilevazione varchar(4) DEFAULT NULL," +
                          "dataRilevazionePrecedente varchar(6) DEFAULT NULL," +
                          "oraRilevazionePrecedente varchar(4) DEFAULT NULL," +
                          "nomeFile varchar(50) DEFAULT 'mark1.txt'," +
                          "Banconote int(11) DEFAULT NULL," +
                          "idRilevazione int(11) DEFAULT NULL," +
                          "PRIMARY KEY (Id)" +
                        ")";

    var valoriMark = "INSERT INTO mark (Id, CodiceGettoniera, Venduto, InviatoInCassa, dataRilevazione, oraRilevazione, dataRilevazionePrecedente, oraRilevazionePrecedente, nomeFile, Banconote, idRilevazione) VALUES" +
                        "(773, '2649G900661', 25340, 18490, '150703', '0739', '150701', '0835', 'dati_Unireader203.07.15.txt', 0, 1)," +
                        "(774, '4949GA02271', 13850, 9390, '150703', '0803', '150702', '0100', 'dati_Unireader203.07.15.txt', 0, 1)," +
                        "(775, '4949GA02270', 5894, 5155, '150703', '0822', '150702', '0119', 'dati_Unireader203.07.15.txt', 0, 1)," +
                        "(776, '3919G302642', 5290, 5600, '150703', '0835', '150702', '0138', 'dati_Unireader203.07.15.txt', 0, 1)";

    creaTabella(strutturaClienti, valoriClienti);
    creaTabella(strutturaDistributori, valoriDistributori);
    creaTabella(strutturaMezzi, valoriMezzi);
    creaTabella(strutturaOperatori, valoriOperatori);    
    creaTabella(strutturaProdotti, valoriProdotti);
    creaTabella(strutturaSituazioneClienti, valoriSituazioneClienti);
    creaTabella(strutturaSituazioneDistributori, valoriSituazioneDistributori);
    creaTabella(strutturaVenduto, valoriVenduto);
    creaTabella(strutturaMark, valoriMark);

} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of cars in the database

function updateCarList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("carlist");

    //clear cars list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li>" + row.Descrizione + " - " + row.Indirizzo + " (<a href='javascript:void(0);' onclick='deleteCar(" + row.IdDistributore + ");'>Delete Car</a>)";
    }

}

//function to get the list of cars from the database

function outputCars() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM distributori", [], updateCarList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

//function to add the car to the database

function creaTabella(strutturaTabella, valoriTabella) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql(strutturaTabella);
            t.executeSql(valoriTabella);
        });

    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

function addCar() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the make and model text inputs
        var make = document.getElementById("carmake").value;
        var model = document.getElementById("carmodel").value;

        //Test to ensure that the user has entered both a make and model
        if (make !== "" && model !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO cars (make, model) VALUES (?, ?)", [make, model]);
                outputCars();
            });
        } else {
            alert("You must enter a make and model!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


//function to remove a car from the database, passed the row id as it's only parameter

function deleteCar(id) {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM cars WHERE id=?", [id], outputCars);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputCars();