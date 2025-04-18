import { Prediction } from "@/app/page"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"

interface ResultsTableProps {
	name: string
}

export function ResultsTable({ name }: ResultsTableProps) {
	const [predictions, setPredictions] = useState<Prediction[]>([])

	useEffect(() => {
		axios.get("http://localhost:5001/list_predictions")
			.then((response) => {
				if(response.status !== 200) {
					throw new Error("Erro ao listar predições")
				}
				console.log(response.data);
				setPredictions(response.data)
			})
			.catch((error) => {
				console.error(error);
			})
	}, [name])


	return (
		<Table className="w-full mx-auto rounded-lg overflow-hidden">
				<TableHeader className="">
					<TableRow className="bg-[#2A2A2A]">
						<TableHead className="text-white text-center font-semibold">Number</TableHead>
						<TableHead className="text-white text-center font-semibold">Box</TableHead>
						<TableHead className="text-white text-center font-semibold">ClassName</TableHead>
						<TableHead className="text-center text-white font-semibold">Confidence</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{predictions.map((row, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium text-white text-center">{index + 1}</TableCell>
							<TableCell className="font-medium text-white text-center">{`${JSON.stringify(row.box)}`}</TableCell>
							<TableCell className="text-white text-center">{row.class_name}</TableCell>
							<TableCell className="text-center text-white">{row.confidence}</TableCell>
						</TableRow>
					))}
				</TableBody>
		</Table>
	);
}