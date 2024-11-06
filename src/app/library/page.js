"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useUserStore } from "@/store/store"
import axios from "axios";
import toast from "react-hot-toast"


export default function DeckList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [decks, setDecks] = useState([]);
  const {UserId} = useUserStore();

  const filteredDecks = decks.filter((deck) =>
    deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getDecks = async() => {
    console.log(UserId)
    const re = await axios.post("/api/decks/get-decks", {userId:UserId});
    const data = re.data;
    console.log(data);
    setDecks(data.decks);


  }



  useEffect(() => {
    getDecks();
  }, [])
  

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Public Decks</h1>
        <Link href={"/decks/create-deck"}>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Create New Deck
        </Button>
        </Link>
      </header>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search decks by title, description, or tags..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.map((deck) => (
          <Card key={deck._id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {deck.title}
              </CardTitle>
              {deck.visibility === "private" ? (
                <Lock className="h-4 w-4 text-gray-500" />
              ) : (
                <Globe className="h-4 w-4 text-gray-500" />
              )}
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">{deck.description}</p>
              <p className="text-xs text-gray-500 mb-2">Deck By: @{deck.userId.username}</p>
              <Badge variant="secondary" className="mb-2">
                {deck.subject}
              </Badge>
              <div className="flex flex-wrap gap-1 mb-2">
                {deck.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500">{deck.cardCount} cards</p>
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              <Link href={`/decks/${deck._id}`}>
              <Button>Open Deck</Button>
              </Link>
             
             </CardFooter>
            
          </Card>
        ))}
      </div>

      {filteredDecks.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No decks found. Create a new deck to get started!</p>
      )}
    </div>
  )
}