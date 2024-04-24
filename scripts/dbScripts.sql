-- Create item table
CREATE TABLE IF NOT EXISTS item
(
    id serial NOT NULL,
    type character varying(50) NOT NULL,
    description text,
    CONSTRAINT item_pkey PRIMARY KEY (id)
);

-- Create organizaiton table
CREATE TABLE IF NOT EXISTS organization
(
    id serial NOT NULL,
    name character varying(255) NOT NULL,
    CONSTRAINT organization_pkey PRIMARY KEY (id)
);

-- Create pricing table
CREATE TABLE IF NOT EXISTS pricing
(
    organization_id integer NOT NULL,
    item_id integer NOT NULL,
    zone character varying(50) NOT NULL,
    base_distance_in_km bigint NOT NULL DEFAULT 5,
    km_price bigint NOT NULL DEFAULT 1.5,
    fix_price bigint NOT NULL DEFAULT 10,
    CONSTRAINT pricing_item_id_fkey FOREIGN KEY (item_id) REFERENCES item (id),
    CONSTRAINT pricing_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organization (id)
);

-- Insert records to organization table
insert into organization
(id, name) values
(1, 'Fast Food Delights'),
(2, 'Fresh Produce Mart');

-- Insert records to item table
insert into item
(id, type, description) values
(1, 'perishable', 'Fresh Milk'),
(2, 'perishable', 'Fresh Chicken Meat'),
(3, 'non-perishable', 'Kellogs Cereal'),
(4, 'non-perishable', 'Almonds');

-- Insert records to pricing table
insert into pricing
(organization_id, item_id, "zone", base_distance_in_km, km_price, fix_price)
values
(1, 1, 'central', 5, 150, 1000),
(1, 1, 'suburban', 5, 150, 800),
(2, 2, 'central', 5, 150, 1000),
(2, 2, 'suburban', 5, 150, 800),
(1, 3, 'central', 5, 100, 1000),
(1, 3, 'suburban', 5, 100, 800),
(2, 3, 'central', 5, 100, 1000),
(2, 3, 'suburban', 5, 100, 800);
