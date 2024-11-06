"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-hot-toast"
import { useUserStore } from "@/store/store"
import axios from "axios"


export default function AddNewDeck() {
    const {UserId}  = useUserStore();
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    visibility: "public",
    tags: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, subject: value }))
  }

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, visibility: value }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be 100 characters or less"
    }

    if (formData.description.length > 500) {
      newErrors.description = "Description must be 500 characters or less"
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required"
    }

    if (formData.tags) {
      const tags = formData.tags.split(",")
      if (tags.some(tag => !tag.trim())) {
        newErrors.tags = "Each tag must be non-empty"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    const data ={
        ...formData,
        userId: UserId
    }
    console.log(data)
    const re = await axios.post("/api/decks/create-deck", data);
    const res = re.data;
    if (res.type == "success"){
        toast.success(res.message);
        router.push("/decks")
    }
    else {
        toast.error(res.message);
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Deck</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter deck title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          <p className="text-sm text-gray-500 mt-1">
            Give your deck a clear and concise title.
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter deck description"
            className="resize-none"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          <p className="text-sm text-gray-500 mt-1">
            Briefly describe the content and purpose of your deck.
          </p>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select onValueChange={handleSelectChange} value={formData.subject}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="language">Language</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          <p className="text-sm text-gray-500 mt-1">
            Choose the main subject area for your deck.
          </p>
        </div>

        <div>
          <Label>Visibility</Label>
          <RadioGroup
            onValueChange={handleRadioChange}
            value={formData.visibility}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="font-normal">Public</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="font-normal">Private</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Set whether your deck is visible to others or just you.
          </p>
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags, separated by commas"
          />
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
          <p className="text-sm text-gray-500 mt-1">
            Add relevant tags to help categorize your deck (e.g., javascript, react, web-development).
          </p>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Deck"}
        </Button>
      </form>
    </div>
  )
}