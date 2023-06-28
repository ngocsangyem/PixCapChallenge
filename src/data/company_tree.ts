import { Employee } from "../types/Employee";

export const organizationalStructure: Employee = {
	uniqueId: 1,
	name: "Mark Zuckerberg",
	subordinates: [
		{
			uniqueId: 2,
			name: "Bruce Willis",
			subordinates: []
		},
		{
			uniqueId: 3,
			name: "Georgina Flangy",
			subordinates: [
				{
					uniqueId: 4,
					name: "Sophie Turner",
					subordinates: []
				}
			]
		},
		{
			uniqueId: 5,
			name: "Sarah Donald",
			subordinates: [
				{
					uniqueId: 6,
					name: "Cassandra Reynolds",
					subordinates: [
						{
							uniqueId: 7,
							name: "Bob Saget",
							subordinates: [
								{
									uniqueId: 8,
									name: "Tina Teff",
									subordinates: [
										{
											uniqueId: 9,
											name: "Will Turner",
											subordinates: []
										}
									]
								}
							]
						},
						{
							uniqueId: 10,
							name: "Mary Blue",
							subordinates: []
						}
					]
				}
			]
		},
		{
			uniqueId: 11,
			name: "Tyler Simpson",
			subordinates: [
				{
					uniqueId: 12,
					name: "Gary Styles",
					subordinates: []
				},
				{
					uniqueId: 13,
					name: "George Carrey",
					subordinates: []
				},
				{
					uniqueId: 14,
					name: "Harry Tobs",
					subordinates: [
						{
							uniqueId: 15,
							name: "Thomas Brown",
							subordinates: []
						}
					]
				}
			]
		}
	]
};


