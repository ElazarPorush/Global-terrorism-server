import { AttackType, Year } from "../models/collections"
import { ICollection } from "../types/collection"

export const getSortedAttacksByType = async () => {
    try {
        const attacks = await AttackType.find().sort({ casualties: -1 }).select('-events')
        return attacks
    } catch (err) {
        throw err
    }
} 